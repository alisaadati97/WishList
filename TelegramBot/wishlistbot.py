import json
import logging
import sys
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import (
    Application, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ContextTypes
)

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.DEBUG,
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

# Load or create wishlists storage
WISHLIST_FILE = "wishlists.json"
try:
    with open(WISHLIST_FILE, "r") as f:
        wishlists = json.load(f)
    logger.info(f"Loaded wishlists: {list(wishlists.keys())}")
except FileNotFoundError:
    wishlists = {}
    logger.info("No wishlists file found, starting with empty dictionary")

# Start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    logger.info(f"Start command received from user {update.effective_user.id}")
    keyboard = [
        [InlineKeyboardButton(
            "📝 Create/View Wishlist", 
            # web_app=WebAppInfo("https://alibalaei76.pythonanywhere.com/")  # Your PythonAnywhere URL
            web_app=WebAppInfo("https://sorarium.eu")
        )],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Welcome to Wishlist Bot! Click the button below to manage your wishlist:",
        reply_markup=reply_markup
    )
    logger.info("Start command response sent with web app button")

# Debug command
async def debug(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Debug command to check if the bot is working"""
    logger.info("Debug command received")
    
    # Show current wishlists
    wishlist_info = f"Current wishlists: {list(wishlists.keys())}"
    logger.info(wishlist_info)
    
    # Show bot information
    bot_info = f"Bot username: @{context.bot.username}"
    logger.info(bot_info)
    
    # Show user information
    user_info = f"Your user ID: {update.effective_user.id}, Username: @{update.effective_user.username}"
    logger.info(user_info)
    
    # Send debug information to user
    await update.message.reply_text(f"Bot is working! 🤖\n{bot_info}\n{user_info}\n{wishlist_info}")
    
    # Add a test wishlist if none exist
    if not wishlists:
        test_username = "test_user"
        wishlists[test_username] = {
            "username": test_username,
            "birthday": "2000-01-01",
            "interests": ["testing", "debugging", "bots"],
            "likes": ["working code", "clear errors", "quick fixes"],
            "dislikes": ["silent failures", "bugs", "connectivity issues"]
        }
        with open(WISHLIST_FILE, "w") as f:
            json.dump(wishlists, f, indent=4)
        logger.info(f"Added test wishlist for {test_username}")
        await update.message.reply_text("Added a test wishlist for debugging.")
        
    # Show the test wishlist
    if "test_user" in wishlists:
        wl = wishlists["test_user"]
        response = f"🎁 Test Wishlist for @{wl['username']}:\n"
        response += f"🎂 Birthday: {wl['birthday']}\n"
        response += f"🌟 Interests: {', '.join(wl['interests'])}\n"
        response += f"✅ Likes: {', '.join(wl['likes'])}\n"
        response += f"❌ Dislikes: {', '.join(wl['dislikes'])}\n"
        await update.message.reply_text(response)

# Handle menu selection
async def menu_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    if query.data == "create_wishlist":
        await query.message.reply_text("Enter your birthday (YYYY-MM-DD):")
        context.user_data["wishlist_stage"] = "birthday"
    elif query.data == "view_wishlist":
        await query.message.reply_text("Enter the username of the wishlist you want to see:")
        context.user_data["wishlist_stage"] = "view_wishlist"

# Handle user messages
async def handle_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.message.from_user.id
    username = update.message.from_user.username
    text = update.message.text

    if "wishlist_stage" not in context.user_data:
        # Show menu if user sends random message without context
        keyboard = [
            [InlineKeyboardButton("📝 Create Wishlist", callback_data="create_wishlist")],
            [InlineKeyboardButton("🔍 View Wishlist", callback_data="view_wishlist")],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text("Not a Correct Response. Please select an option from the menu:", reply_markup=reply_markup)
        return

    stage = context.user_data["wishlist_stage"]

    if stage == "birthday":
        context.user_data["wishlist"] = {"username": username, "birthday": text, "interests": [], "likes": [], "dislikes": []}
        context.user_data["wishlist_stage"] = "interests"
        await update.message.reply_text("Now enter 5 topics about your interests, separated by commas:")

    elif stage == "interests":
        context.user_data["wishlist"]["interests"] = text.split(", ")
        context.user_data["wishlist_stage"] = "likes"
        await update.message.reply_text("Enter 5 things you LIKE to receive as a gift, separated by commas:")

    elif stage == "likes":
        context.user_data["wishlist"]["likes"] = text.split(", ")
        context.user_data["wishlist_stage"] = "dislikes"
        await update.message.reply_text("Enter 5 things you DISLIKE receiving as a gift, separated by commas:")

    elif stage == "dislikes":
        context.user_data["wishlist"]["dislikes"] = text.split(", ")
        wishlists[username] = context.user_data["wishlist"]

        # Save wishlist to file
        with open(WISHLIST_FILE, "w") as f:
            json.dump(wishlists, f, indent=4)

        context.user_data["wishlist_stage"] = None
        await update.message.reply_text("✅ Wishlist created successfully! Others can now view it using your username.")
        
        # Show menu again
        keyboard = [
            [InlineKeyboardButton("📝 Create Wishlist", callback_data="create_wishlist")],
            [InlineKeyboardButton("🔍 View Wishlist", callback_data="view_wishlist")],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text("What would you like to do next?", reply_markup=reply_markup)

    elif stage == "view_wishlist":
        # Normalize the username (remove @ if present and convert to lowercase)
        search_username = text
        if search_username.startswith('@'):
            search_username = search_username[1:]
        search_username = search_username.lower()
        
        # Try to find the username (case-insensitive)
        found = False
        for key in wishlists:
            if key.lower() == search_username:
                found = True
                wl = wishlists[key]
                response = f"🎁 Wishlist for @{wl['username']}:\n"
                response += f"🎂 Birthday: {wl['birthday']}\n"
                response += f"🌟 Interests: {', '.join(wl['interests'])}\n"
                response += f"✅ Likes: {', '.join(wl['likes'])}\n"
                response += f"❌ Dislikes: {', '.join(wl['dislikes'])}\n"
                break
        
        if not found:
            response = "❌ Wishlist not found."

        await update.message.reply_text(response)
        context.user_data["wishlist_stage"] = None
        
        # Show menu again after viewing wishlist
        keyboard = [
            [InlineKeyboardButton("📝 Create Wishlist", callback_data="create_wishlist")],
            [InlineKeyboardButton("🔍 View Wishlist", callback_data="view_wishlist")],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text("What would you like to do next?", reply_markup=reply_markup)

async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle data received from Web App"""
    logger.info('\n\n------ WebApp Data Received ------')
    logger.info(f'User ID: {update.effective_user.id}, Username: {update.effective_user.username}')
    
    if not update.effective_message:
        logger.error("No effective message found")
        return
        
    if not hasattr(update.effective_message, 'web_app_data'):
        logger.error("No web_app_data in message")
        return
        
    try:
        raw_data = update.effective_message.web_app_data.data
        logger.info(f'Raw data received: {raw_data}')
        
        if not raw_data:
            logger.error("Empty data received")
            await update.message.reply_text("❌ Error: Empty data received from web app")
            return
            
        data = json.loads(raw_data)
        logger.info(f'Parsed data: {data}')
        
        if 'action' not in data:
            logger.error("No action specified in data")
            await update.message.reply_text("❌ Error: Invalid data format - missing action")
            return
        
        if data['action'] == 'create':
            logger.info('Creating wishlist...')
            username = update.effective_message.from_user.username
            if not username:
                logger.error("User has no username")
                await update.message.reply_text("❌ Error: You need to set a username in your Telegram profile to create a wishlist.")
                return
                
            logger.info(f'Creating wishlist for username: {username}')
            
            if 'data' not in data:
                logger.error("No wishlist data provided")
                await update.message.reply_text("❌ Error: Invalid data format - missing wishlist data")
                return
                
            wishlist_data = data['data']
            wishlist_data['username'] = username
            
            wishlists[username] = wishlist_data
            with open(WISHLIST_FILE, "w") as f:
                json.dump(wishlists, f, indent=4)
                
            logger.info(f"Wishlist created for {username}: {wishlist_data}")
            await update.message.reply_text("✅ Wishlist created successfully!")
            
        elif data['action'] == 'view':
            logger.info('Viewing wishlist...')
            
            if 'username' not in data:
                logger.error("No username provided for viewing")
                await update.message.reply_text("❌ Error: No username provided")
                return
                
            username = data['username']
            logger.info(f'Original username input: "{username}"')
            
            # Remove @ if present and convert to lowercase for case-insensitive comparison
            if username.startswith('@'):
                username = username[1:]
            username = username.lower().strip()
            
            logger.info(f'Looking for username: "{username}"')
            logger.info(f'Available wishlists: {list(wishlists.keys())}')
            
            # Try to find the username (case-insensitive)
            found = False
            for key in wishlists:
                logger.debug(f'Comparing with key: "{key.lower()}"')
                if key.lower() == username:
                    found = True
                    wl = wishlists[key]
                    response = f"🎁 Wishlist for @{wl['username']}:\n"
                    response += f"🎂 Birthday: {wl['birthday']}\n"
                    response += f"🌟 Interests: {', '.join(wl['interests'])}\n"
                    response += f"✅ Likes: {', '.join(wl['likes'])}\n"
                    response += f"❌ Dislikes: {', '.join(wl['dislikes'])}\n"
                    break
            
            if not found:
                logger.warning(f'Wishlist NOT found for "{username}"')
                response = f"❌ Wishlist not found for username: {username}"

            logger.info(f'Sending response: {response}')
            await update.message.reply_text(response)
            
        elif data['action'] == 'test':
            logger.info('Test action received!')
            logger.info(f'Test data: {data}')
            
            # Send a response to confirm the test worked
            response = "✅ Test connection successful! The bot received your test message."
            if 'timestamp' in data:
                response += f"\nTimestamp: {data['timestamp']}"
            if 'message' in data:
                response += f"\nMessage: {data['message']}"
                
            logger.info(f'Sending test response: {response}')
            await update.message.reply_text(response)
            
        else:
            logger.error(f"Unknown action: {data['action']}")
            await update.message.reply_text(f"❌ Error: Unknown action: {data['action']}")
        
    except json.JSONDecodeError as e:
        logger.error(f'JSON Decode Error: {str(e)}')
        logger.error(f'Raw data causing error: {raw_data}')
        await update.message.reply_text(f"❌ Error: Invalid JSON data received: {str(e)}")
    except Exception as e:
        logger.error(f'Error: {str(e)}')
        import traceback
        logger.error(traceback.format_exc())
        await update.message.reply_text(f"❌ Error: {str(e)}")

# Check handlers command
async def check_handlers(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Command to check if handlers are properly registered"""
    logger.info("Check handlers command received")
    
    # Get the application instance
    app = context.application
    
    # Check if the web app handler is registered
    handlers_info = "Registered handlers:\n"
    for group in sorted(app.handlers.keys()):
        handlers_info += f"Group {group}:\n"
        for handler in app.handlers[group]:
            handler_type = type(handler).__name__
            if isinstance(handler, MessageHandler):
                filter_info = str(handler.filters)
                handlers_info += f"  - {handler_type} with filters: {filter_info}\n"
            else:
                handlers_info += f"  - {handler_type}\n"
    
    logger.info(handlers_info)
    await update.message.reply_text(handlers_info)

# Run the bot
def main():
    logger.info("Starting bot...")        
    app = Application.builder().token("7690192208:AAET5jixW4zWFai9JNG8NHRnUlMTdEX7di4").build()
    
    # Add handlers
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("debug", debug))
    app.add_handler(CommandHandler("check_handlers", check_handlers))
    
    # Make sure web app data handler is registered with high priority
    logger.info("Registering web app data handler")
    webapp_handler = MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data)
    app.add_handler(webapp_handler, group=1)
    
    # Other handlers
    app.add_handler(CallbackQueryHandler(menu_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_messages))

    logger.info("Bot is running...")
    app.run_polling(drop_pending_updates=True)

if __name__ == "__main__":
    main()

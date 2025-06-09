// =============================================================================
// CENTRALIZED API CLIENT - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// Base configuration for API calls
// export const API_CONFIG = {
//   BASE_URL: 'https://api.wishapp.com/v1',
//   TIMEOUT: 10000, // 10 seconds
// };

// // Auth token management
// export const getAuthToken = (): string | null => {
//   return localStorage.getItem('authToken');
// };

// export const setAuthToken = (token: string): void => {
//   localStorage.setItem('authToken', token);
// };

// export const removeAuthToken = (): void => {
//   localStorage.removeItem('authToken');
// };

// // Generic API client with error handling
// export class ApiClient {
//   private baseURL: string;
//   private timeout: number;

//   constructor(baseURL: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
//     this.baseURL = baseURL;
//     this.timeout = timeout;
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<T> {
//     const url = `${this.baseURL}${endpoint}`;
//     const authToken = getAuthToken();

//     const config: RequestInit = {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(authToken && { Authorization: `Bearer ${authToken}` }),
//         ...options.headers,
//       },
//     };

//     // Add timeout
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), this.timeout);
//     config.signal = controller.signal;

//     try {
//       const response = await fetch(url, config);
//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         // Handle different HTTP error codes
//         switch (response.status) {
//           case 401:
//             removeAuthToken();
//             throw new Error('Authentication required');
//           case 403:
//             throw new Error('Access forbidden');
//           case 404:
//             throw new Error('Resource not found');
//           case 429:
//             throw new Error('Too many requests');
//           case 500:
//             throw new Error('Server error');
//           default:
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       clearTimeout(timeoutId);
//       if (error instanceof Error && error.name === 'AbortError') {
//         throw new Error('Request timeout');
//       }
//       throw error;
//     }
//   }

//   async get<T>(endpoint: string): Promise<T> {
//     return this.request<T>(endpoint, { method: 'GET' });
//   }

//   async post<T>(endpoint: string, data?: any): Promise<T> {
//     return this.request<T>(endpoint, {
//       method: 'POST',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async patch<T>(endpoint: string, data?: any): Promise<T> {
//     return this.request<T>(endpoint, {
//       method: 'PATCH',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async delete<T>(endpoint: string): Promise<T> {
//     return this.request<T>(endpoint, { method: 'DELETE' });
//   }
// }

// // Export singleton instance
// export const apiClient = new ApiClient();

// =============================================================================
// USAGE EXAMPLES:
//
// // Get user occasions
// const occasions = await apiClient.get<ApiOccasion[]>('/occasions');
//
// // Create new occasion
// const newOccasion = await apiClient.post<ApiOccasion>('/occasions', {
//   title: 'Birthday 2024',
//   date: '2024-06-15',
//   isPublic: true
// });
//
// // Update user profile
// const updatedUser = await apiClient.patch<ApiUser>('/users/me', {
//   interests: 'Gaming, Books, Travel'
// });
// =============================================================================

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment all code above
// 2. Update API_CONFIG.BASE_URL to your actual API endpoint
// 3. Replace individual fetch calls in components with apiClient methods
// 4. Add proper error handling and loading states in components
// 5. Consider adding request/response interceptors for logging
// =============================================================================

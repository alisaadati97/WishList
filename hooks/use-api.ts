"use client"

// =============================================================================
// CUSTOM HOOKS FOR API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// import { useState, useEffect, useCallback } from 'react';
// import { apiClient } from '@/lib/api-client';

// // Generic hook for API calls with loading and error states
// export function useApi<T>(
//   endpoint: string,
//   options?: {
//     immediate?: boolean;
//     dependencies?: any[];
//   }
// ) {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const result = await apiClient.get<T>(endpoint);
//       setData(result);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   }, [endpoint]);

//   useEffect(() => {
//     if (options?.immediate !== false) {
//       fetchData();
//     }
//   }, [fetchData, ...(options?.dependencies || [])]);

//   return { data, loading, error, refetch: fetchData };
// }

// // Hook for mutations (POST, PATCH, DELETE)
// export function useMutation<TData, TVariables = any>(
//   mutationFn: (variables: TVariables) => Promise<TData>
// ) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const mutate = useCallback(async (variables: TVariables): Promise<TData | null> => {
//     setLoading(true);
//     setError(null);
//     try {
//       const result = await mutationFn(variables);
//       return result;
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   }, [mutationFn]);

//   return { mutate, loading, error };
// }

// // Specific hooks for common operations
// export function useOccasions() {
//   return useApi<ApiOccasion[]>('/occasions');
// }

// export function useOccasionWishes(occasionId: string) {
//   return useApi<ApiWish[]>(`/occasions/${occasionId}/wishes`, {
//     dependencies: [occasionId]
//   });
// }

// export function useFollowing() {
//   return useApi<ApiFriend[]>('/users/following');
// }

// export function useNotifications() {
//   return useApi<ApiNotification[]>('/notifications');
// }

// export function useUserProfile() {
//   return useApi<ApiUser>('/users/me');
// }

// export function useUserTasks() {
//   return useApi<ApiTask[]>('/users/me/tasks');
// }

// =============================================================================
// USAGE EXAMPLES IN COMPONENTS:
//
// // In MyOccasions component:
// const { data: occasions, loading, error, refetch } = useOccasions();
//
// // In OccasionDetail component:
// const { data: wishes, loading, error } = useOccasionWishes(occasion.id);
//
// // For creating occasions:
// const createOccasionMutation = useMutation(
//   (data: CreateOccasionData) => apiClient.post<ApiOccasion>('/occasions', data)
// );
//
// const handleCreateOccasion = async (data: CreateOccasionData) => {
//   const result = await createOccasionMutation.mutate(data);
//   if (result) {
//     // Handle success
//     refetchOccasions();
//   }
// };
// =============================================================================

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment all code above
// 2. Replace useState/useEffect patterns in components with these hooks
// 3. Add proper TypeScript interfaces for API responses
// 4. Consider adding optimistic updates for better UX
// 5. Add error boundaries for graceful error handling
// =============================================================================

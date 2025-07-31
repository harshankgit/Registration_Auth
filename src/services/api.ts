const BACKEND_URL = "https://rainflowweb.com/demo/react_test";

export interface RegisterData {
  name: string;
  email: string;
  number: string;
  gender: string;
  password: string;
  confirm_password: string;
  is_admin: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  user_id: number;
  name: string;
  email: string;
  number: string;
  gender: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface UserData {
  user_id: number;
  name: string;
  email: string;
  is_admin: number;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  number: string;
  gender: string;
  is_admin: string;
}

// Helper function to create FormData
const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
};

// Register user
export const registerUser = async (data: RegisterData): Promise<ApiResponse<{ user_id: number }>> => {
  try {
    const formData = createFormData(data);
    
    const response = await fetch(`${BACKEND_URL}/new_user.php`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (data: LoginData): Promise<ApiResponse<UserData>> => {
  try {
    const formData = createFormData(data);
    
    const response = await fetch(`${BACKEND_URL}/login.php`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        if (errorData.error?.code === 'INVALID_CREDENTIALS') {
          throw new Error('Invalid email or password. Please check your credentials.');
        }
        throw new Error(errorData.error?.message || errorData.message || `Login failed: ${response.status}`);
      } catch (parseError) {
        throw new Error(`Login failed: ${response.status}`);
      }
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${BACKEND_URL}/logout.php`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Get user list (admin only)
export const getUserList = async (): Promise<ApiResponse<UserListItem[]>> => {
  try {
    const response = await fetch(`${BACKEND_URL}/user_list.php`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (data: UpdateUserData): Promise<ApiResponse<UserListItem>> => {
  try {
    const formData = createFormData(data);
    
    const response = await fetch(`${BACKEND_URL}/update_user.php`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Update failed: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId: number): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${BACKEND_URL}/delete_user.php?user_id=${userId}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Delete failed: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
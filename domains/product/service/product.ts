import { AUTH_COOKIE } from "@/utils/authConstant";
import { EditProduct, Product } from "../../../model/Product/type";
import Cookies from 'js-cookie'

export const executeProcessGetProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get(AUTH_COOKIE)}`,
        },
    });

    if(!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data: Product[] = await response.json();
    
    return data;
  } catch (error: any) {
    throw error;
  }
}

export const executeProcessAddProduct = async(form: Product): Promise<void> => {
  try{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get(AUTH_COOKIE)}`,
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      console.error('Failed to add product');
    }
  } catch(error: any) {
    throw error;
  }
}

export const executeProcessEditProduct = async (form: EditProduct): Promise<void> => {
  try{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product${form.id}`, {
      method: 'PATCH',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get(AUTH_COOKIE)}`,
      },
      body: JSON.stringify(form.description),
    });

    if (!response.ok) {
      console.error('Failed to edit product');
    }
  } catch(error: any) {
    throw error;
  }
};

export const executeProcessDeleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get(AUTH_COOKIE)}`,
        },
    });

    if (!response.ok) {
        console.error('Failed to delete product');
    }
  } catch(error: any) {
    throw error;
  }
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Ganti URL ini dengan endpoint Formspree atau API backend milikmu
    const response = await fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};
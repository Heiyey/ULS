document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");

  // Evento de envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el envío por defecto

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      serial: document.getElementById("serial").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Good job!",
          text: "Your request has been sent successfully!",
          icon: "success",
        });
        form.reset(); // Resetea el formulario
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error!",
          text: errorData.error || "Failed to send the request.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while sending the request.",
        icon: "error",
      });
    }
  });
});

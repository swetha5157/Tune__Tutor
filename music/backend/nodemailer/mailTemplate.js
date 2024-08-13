const NotificationTypes = {
    CHECKOUT_CONFIRMATION: "CHECKOUT_CONFIRMATION",
  };
  
  exports.generateEmailBody = (orderDetails, type) => {
    const { products, totalAmount, deliveryDate } = orderDetails;

    let subject = '';
    let body = '';
    let orderLength=products.length;
    switch (type) {
      case NotificationTypes.CHECKOUT_CONFIRMATION:
        subject = `Order Confirmation - ${orderLength} item(s)`;
        body = `
          <div>
            <h2>Thank you for your purchase from TuneEmporium! 🎶</h2>
            <p>Your order has been confirmed.</p>
            <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
            <p><strong>Estimated Delivery Date:</strong> ${deliveryDate}</p>
            <ul>
              ${products.map(product => `
                <li>
                  <strong>${product.name}</strong> - $${(product.price * product.quantity).toFixed(2)}
                  <br>Quantity: ${product.quantity}
                </li>
              `).join('')}
            </ul>
            <p>We hope you enjoy your new items!</p>
          </div>
        `;
        break;

      default:
        throw new Error('Invalid notification type.');
    }

    return { subject, body };
};

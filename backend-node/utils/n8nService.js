export const sendVerificationEmail = (payload) => {
  try {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!n8nWebhookUrl) {
      console.error('❌ ALERTA: No se encontró N8N_WEBHOOK_URL en el archivo .env');
      return; 
    }

    fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(() => console.log(`📬 Webhook entregado a n8n para: ${payload.email}`))
    .catch(err => console.error('❌ Falló la entrega al Webhook:', err.message));
    
  } catch (error) {
    console.error('❌ Error interno en el servicio de n8n:', error.message);
  }
};
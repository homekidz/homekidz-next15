export async function sendGridEmail(apiKey: string, from: string, to: string, subject: string, html: string) {
  if (!apiKey) return false
  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from },
        subject,
        content: [{ type: 'text/html', value: html }]
      })
    })
    return true
  } catch (e) {
    return false
  }
}

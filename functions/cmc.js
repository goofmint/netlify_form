const { CustomersMailCloud } = require('customersmailcloud');

exports.handler = async function(event, context, callback) {
  const {email, name, body} = event.body;
  const api_user = 'API_USER'
  const api_key  = 'API_KEY'
  const client = new CustomersMailCloud(process.env.API_USER, process.env.API_KEY)
  client.trial();
  client
    .setFrom('Admin', process.env.FROM_ADDRESS)
    .addTo(name, email)
    .setSubject('お問い合わせがありました')
    .setText(`お問い合わせ内容\n${body}`)
  try {
    const res = await client.send()
    callback(null, {
      statusCode: 200,
      body: res
    });
  } catch (e) {
    callback(null, {
      statusCode: 503,
      body: e
    });
  }
}
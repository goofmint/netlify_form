
$(() => {
  $('.hide').hide();
  $('form').on('submit', async (e) => {
    e.preventDefault();
    const alert = $('.alert');
    try {
      await sendMail();
      alert
        .addClass('alert-success')
        .html('お問い合わせありがとうございます。お返事まで少々お待ちください。')
        .show();
    } catch (err) {
      alert
        .addClass('alert-danger')
        .html('エラーが発生しました。しばらく待ってから再送信してください。')
        .show()
    }
  })
})

async function sendMail() {
  const params = $('form').serializeArray()
    .reduce(function(acc, cur, i) {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
  return await fetch('/.netlify/functions/cmc', {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });
}

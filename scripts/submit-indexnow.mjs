const host = 'autonomyxdr.com'
const key = '7c1fd8b2a9e54c0f93d61b7e48a205cd'
const homepage = `https://${host}/`

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: [homepage],
  }),
})

if (!response.ok) {
  const details = await response.text()
  throw new Error(`IndexNow rejected the update (${response.status}): ${details}`)
}

console.log(`IndexNow accepted the update for ${homepage} (${response.status}).`)

const schedule = require('node-schedule')
const EpulzeBot = require('./epulze')
const EslBot = require('./esl')
const dayjs = require('dayjs')
const colors = require('colors')

console.log('Starting Scheduler...')

module.exports = schedule.scheduleJob('0 0 0,6,12,18 * * *', async fireDate => {
  let date = dayjs(fireDate)

  console.log(
    `[${date.format('YYYY-MM-DD HH:mm:ss')}] Running Scheduled Job...`.green
  )

  let reports = []

  reports.push(await EslBot.start())
  reports.push(await EpulzeBot.start())

  let nowDate = dayjs()

  console.log(
    `\nScheduled Job finished its work. It took ${nowDate.diff(
      date,
      'second'
    )} seconds. Result: `.bgGreen.black
  )

  reports.forEach(rep => {
    if (rep.message) return console.log(`${rep.botName}: ${rep.message}`.yellow)

    console.log(
      `\n${rep.botName}: added ${rep.added},`.green,
      `failed: ${rep.failed}\n`.red
    )
  })

  console.log(
    `Next job is supposed to run on ${date
      .add(6, 'hour')
      .format('YYYY-MM-DD HH:mm:ss')}`
  )
})

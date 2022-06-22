import timezoneRaw from 'timezones.json'

export const timezones = timezoneRaw.flatMap((x) => {
  return x.utc.map((y) => {
    return {
      name: y,
      offset: x.offset,
      isdst: x.isdst
    }
  })
})
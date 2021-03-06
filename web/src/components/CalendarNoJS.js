import React, { Component } from 'react'
import format from 'date-fns/format'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { Checkbox } from '../components/forms/MultipleChoice'
import PropTypes from 'prop-types'
import Time, { dateToISODateString } from './Time'
import {
  getMonthNameAndYear,
  getEnabledDays,
} from '../utils/calendarDates'

const calList = css`
  display: flex;

  h2 {
    margin-top: 0;
    margin-bottom: ${theme.spacing.md};
  }

  ${mediaQuery.lg(css`
    flex-direction: column;
  `)};
`

const column = css`
  border-left: 2px solid black;
  padding-left: ${theme.spacing.lg};
  margin: 0 ${theme.spacing.xxl} ${theme.spacing.lg} 0;

  /* this is so that the border bottom aligns with the bottom of the checkbox */
  li:last-of-type label {
    padding-bottom: 2px;
  }
`

const Calendar = ({ dates, locale }) => {
  const days = getEnabledDays()
  const mapped = {}

  days.forEach((date, index) => {
    const monthName = getMonthNameAndYear(date, locale)
    const idMonth = format(date, 'MM')
    const val = dateToISODateString(date)
    const checked = dates.includes(val)

    const el = (
      <li key={val}>
        <Checkbox
          name="selectedDays"
          id={`selectedDays-${idMonth}-${index}`}
          value={val}
          label={
            <Time
              date={date}
              locale={locale}
              options={{ weekday: 'long', day: 'numeric', month: 'long' }}
            />
          }
          onChange={() => {}}
          checked={checked}
        />
      </li>
    )

    // eslint-disable-next-line security/detect-object-injection
    let vals = mapped[monthName] || []
    vals.push(el)
    // eslint-disable-next-line security/detect-object-injection
    mapped[monthName] = vals
  })

  /*eslint-disable */
  return (
    <div className={calList}>
      {Object.keys(mapped).map((keyName, keyIndex) => {
        return (
          <div key={keyIndex} id="calendar-checkboxes">
            <h2>{keyName}</h2>
            <ul className={column} key={keyName}>
              {mapped[keyName]}
            </ul>
          </div>
        )
      })}
    </div>
  )
  /*eslint-enable */
}

Calendar.propTypes = {
  dates: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  locale: PropTypes.string,
}

// Go 4 weeks from today (ie, add 28 days)
// Count 8 weeks from that point (ie, add 56 days)
class CalendarNoJs extends Component {
  render() {
    const { dates, locale } = this.props
    return (
      <Calendar
        dates={dates && dates.selectedDays ? dates.selectedDays : []}
        locale={locale}
      />
    )
  }
}

CalendarNoJs.propTypes = {
  dates: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  locale: PropTypes.string.isRequired,
}

export default CalendarNoJs

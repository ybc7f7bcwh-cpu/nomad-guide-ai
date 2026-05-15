/**
 * @typedef {'food' | 'transport' | 'sightseeing'} ActivityType
 *
 * @typedef {Object} Activity
 * @property {string} time - e.g. "09:00"
 * @property {string} location
 * @property {ActivityType} type
 * @property {number} cost - in USD
 * @property {string} [walkingTime] - e.g. "~10 min"
 *
 * @typedef {Object} DayPlan
 * @property {string} date - e.g. "Day 1"
 * @property {string} weather - e.g. "Sunny, 24°C"
 * @property {Activity[]} activities
 *
 * @typedef {Object} Itinerary
 * @property {string} destination
 * @property {number} totalBudget
 * @property {DayPlan[]} days
 *
 * @typedef {Object} AgentResponse
 * @property {string} text - Chat message to display
 * @property {Itinerary} [itinerary] - Structured plan (if applicable)
 * @property {string[]} [thoughts] - Step-by-step reasoning steps
 */

export const ActivityTypes = Object.freeze({
  FOOD: 'food',
  TRANSPORT: 'transport',
  SIGHTSEEING: 'sightseeing',
});

export {};

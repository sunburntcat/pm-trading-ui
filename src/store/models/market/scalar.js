import { Record } from 'immutable'
import { OUTCOME_TYPES } from 'utils/constants'

const ScalarMarketRecord = Record({
  type: OUTCOME_TYPES.SCALAR,
  address: undefined,
  title: undefined, // string
  description: undefined, // string
  resolution: undefined, // moment
  volume: undefined, // decimal
  winningOutcome: undefined, // int
  bounds: undefined, // BoundRecord
  funding: undefined, // int
  creation: undefined, // moment
  stage: undefined, // int
  resolved: undefined, // boolean
  creator: undefined, // string
  collateralToken: undefined, // string
  outcomeTokensSold: undefined, // List<int>
}, 'Market')

export default ScalarMarketRecord

import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames/bind'
import moment from 'moment'
import Decimal from 'decimal.js'
import Block from 'components/layout/Block'
import Span from 'components/layout/Span'
import Countdown from 'components/Countdown'
import Paragraph from 'components/layout/Paragraph'
import { getFeatureConfig } from 'utils/features'
import style from './ClaimReward.mod.scss'

const rewardsConfig = getFeatureConfig('rewards')
const { rewardToken, claimReward } = rewardsConfig
const claimUntilFormat = 'y[Y] M[M] D[d] h[h] m[m]'
const rewardsClaimed = window ? window.localStorage.getItem('rewardsClaimed') === 'true' : false
const cx = cn.bind(style)

const ClaimReward = ({ openClaimRewardModal, rewardValue }) => (
  <Block className={cx('claimReward')}>
    <Block className={cx('rewardInfoContainer')}>
      <Block className={cx('rewardAmount')}>
        <Span className={cx('infoText', 'amount')}>
          {rewardsClaimed || !rewardValue ? 'N/A' : `${rewardValue} ${rewardToken.symbol}`}
        </Span>
        <Paragraph className={cx('annotation')}>CLAIMABLE {rewardToken.symbol}</Paragraph>
      </Block>
      <Block className={cx('timeToClaim')}>
        {rewardsClaimed || !rewardValue ? (
          <span className={cx('infoText')}>N/A</span>
        ) : (
          <Countdown className={cx('infoText')} target={claimReward.claimUntil} format={claimUntilFormat} />
        )}
        <Paragraph className={cx('annotation')}>TIME LEFT TO CLAIM</Paragraph>
      </Block>
    </Block>
    <button
      className={cx('claimButton')}
      onClick={openClaimRewardModal}
      disabled={
        rewardsClaimed ||
        Decimal(rewardValue || 0).lte(0) ||
        !moment.utc().isBetween(claimReward.claimStart, claimReward.claimUntil)
      }
    >
      CLAIM NOW
    </button>
  </Block>
)

ClaimReward.propTypes = {
  openClaimRewardModal: PropTypes.func.isRequired,
  rewardValue: PropTypes.number.isRequired,
}

export default ClaimReward

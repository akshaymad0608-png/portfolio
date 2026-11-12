import React from 'react';
import LpHow from './LpHow';
import LpWork from './LpWork';
import LpServices from './LpServices';
import LpVideo from './LpVideo';
import LpPricing from './LpPricing';
import LpFaq from './LpFaq';
import LpPosts from './LpPosts';
import LpCta from './LpCta';

/**
 * Everything on the home page below the hero. Kept in one module so Home can
 * load it as a single lazy chunk: the hero paints without waiting for the
 * pricing, FAQ and video code, which keeps the entry bundle small on phones.
 */
const LpBelowFold: React.FC = () => (
  <>
    <LpHow />
    <LpWork />
    <LpServices />
    <LpVideo />
    <LpPricing />
    <LpFaq />
    <LpPosts />
    <LpCta />
  </>
);

export default LpBelowFold;

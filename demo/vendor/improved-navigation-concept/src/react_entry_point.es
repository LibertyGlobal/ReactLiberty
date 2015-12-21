import React from 'react';
import ReactUpdates from 'react/lib/ReactUpdates';

import ReactDefaultBatchingStrategy from './ReactDefaultBatchingStrategy';

ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
console.info('correct one');
export default React;

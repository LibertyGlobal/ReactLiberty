import createHashHistory from 'history/lib/createHashHistory';
import {useQueries} from 'history';

const history = useQueries(createHashHistory)();

export default history;

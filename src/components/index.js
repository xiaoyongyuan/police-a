
// import Loadable from 'react-loadable';
// import Loading from './widget/Loading';
//首页
import HoneIndex from './home/HoneIndex';

//警报
import AlarmList from './alarm/AlarmList';
import AlarmSta from './alarm/AlarmSta';
import AlarmDetail from './alarm/AlarmDetail';
import ShortVideo from './alarm/ShortVideo';


//账号管理
import Employeelist from './settings/Employeelist';

import CascaderModule from './common/CascaderModule'; //省市区三级联动


// const WysiwygBundle = Loadable({ // 按需加载富文本配置
//     loader: () => import('./ui/Wysiwyg'),
//     loading: Loading,
// });

export default {
    HoneIndex
    ,AlarmList ,AlarmSta ,AlarmDetail ,ShortVideo
    ,Employeelist
    ,CascaderModule
}
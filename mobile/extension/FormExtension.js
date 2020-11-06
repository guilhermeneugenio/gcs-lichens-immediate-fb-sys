import SensorElement from './SensorElement';
import LichensImagePicker from './LichensImagePicker';
import TrunkSlider from './TrunkSlider';
const ext = [
    {
        type: 'ext:sensor',
        component: SensorElement
    },
    {
        type: 'LichensImagePicker',
        component: LichensImagePicker
    },
    {
        type: 'TrunkSlider',
        component: TrunkSlider
    }
];

export default ext;
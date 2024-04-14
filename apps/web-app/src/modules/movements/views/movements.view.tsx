import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component'
import LastMovements from '../components/last-movements.components';
import RegisterMovement from '../components/register-movement.component';
import { MovementsViewPropsType } from '../types/movements.types';
import { useMovements } from '../contexts/movements.context';
import { useGlobal } from '@/modules/global/contexts/global.context';

const MovementsView = ({ handlers }: MovementsViewPropsType) => {

    const { contentLoader, actionLoader } = useGlobal();

    const { movementsList } = useMovements();

    return (

        <MainContainer>

            <MainTitle title={['Movimentações']} />

            <div className='flex flex-row'>

                <RegisterMovement handleCreateMovement={handlers.handleCreateMovement} actionLoader={actionLoader} />

                <LastMovements data={movementsList} loading={contentLoader} />

            </div>

        </MainContainer>

    );
};

export default MovementsView;
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDownUp, CircleFadingPlus, Minus, Plus } from "lucide-react";
import { useState } from 'react';
import { RegisterMovementComponentPropsType } from "../types/movements.types";

const RegisterMovement = ({ handleCreateMovement, actionLoader }: RegisterMovementComponentPropsType) => {

    const [type, setType] = useState('IN');
    const [productId, setProductId] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);

    const isButtonEnabled = () => {
        if (productId && description && quantity) return true;
        return false;
    };

    return (

        <Card className="flex flex-col items-center gap-3 p-10 flex-1 justify-center border-b-8 mb-6">

            <ArrowDownUp className="w-12 h-12 text-primary" />
            <h2 className="font-semibold text-3xl mb-2">Registrar Movimentação</h2>

            <div className="flex flex-col gap-6 items-center py-4">

                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="account" onClick={() => setType('IN')}>Entrada</TabsTrigger>
                        <TabsTrigger value="password" onClick={() => setType('OUT')}>Saída</TabsTrigger>
                        <TabsTrigger value="balanco" onClick={() => setType('BAL')}>Balanço</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Input placeholder="Código do produto"></Input>

                <div className='flex flex-col gap-1 items-center'>
                    <span className="font-semibold text-2xl opacity-70">Iphone 12 Pro Max</span>
                    <span className="text-sm font-extralight">Estoque atual 30 un. </span>
                </div>

                <Input placeholder="Descrição" onChange={(e) => setDescription(e.target.value)}></Input>

                <div className="flex flex-row items-center justify-center gap-2">
                    <Button variant={'outline'} onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}><Minus /></Button>
                    <Input type="number" value={quantity} className="text-center" onChange={(e) => setQuantity(parseFloat(e.target.value))} />
                    <Button variant={'outline'} onClick={() => setQuantity(quantity + 1)}><Plus /></Button>
                </div>

            </div>

            <Button
                onClick={() => { handleCreateMovement({ type, productId, description, quantity }) }}
                disabled={!isButtonEnabled()} variant={isButtonEnabled() ? 'default' : 'secondary'}
                loading={actionLoader}
            >
                <CircleFadingPlus className="mr-2" />Registrar
            </Button>

        </Card>
    );
};

export default RegisterMovement;
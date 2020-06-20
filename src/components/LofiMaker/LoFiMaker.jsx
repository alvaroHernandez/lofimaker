import React, {useState} from 'react';
import { Layout, Column } from "../Layout/Column";
import BeatsCreator from "../BeatsCreator/BeatsCreator";
import Dialog from "@reach/dialog";
import ImageLoader from "../ImageLoader/ImageLoader";

const LoFiMaker = () => {
    const [openDialog,setOpenDialog] = useState(false);
    return (
        <Layout>
            <Column span={3}/>
            <Column span={6}>
                <Dialog aria-label="welcome dialog" isOpen={openDialog}>
                    Bienvenido a LofiMaker
                    <button onClick={() => setOpenDialog(false)}>Close</button>
                </Dialog>
                <ImageLoader/>
                <BeatsCreator/>
            </Column>
            <Column span={3}/>
        </Layout>
    );
};

export default LoFiMaker;

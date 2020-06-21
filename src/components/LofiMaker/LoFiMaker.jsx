/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react';
import { Layout, Column } from "../Layout/Column";
import BeatsCreator from "../BeatsCreator/BeatsCreator";
import Dialog from "@reach/dialog";
import ImageLoader from "../ImageLoader/ImageLoader";
import {dark, light} from "../../styles/colors";
import "@reach/tabs/styles.css";




const LoFiMaker = () => {
    const [openDialog,setOpenDialog] = useState(false);
    return (
        <Layout color={'white'} backgroundColor={light}>
            <Column spanSmall={1} spanMedium={2}/>
            <Column backgroundColor={dark} spanSmall={10} spanMedium={8}>
                <h1 css={{textAlign: 'center'}}>
                    Lo-fi Maker
                </h1>
                <Dialog aria-label="welcome dialog" isOpen={openDialog}>
                    Welcome to LofiMaker
                    <button onClick={() => setOpenDialog(false)}>Close</button>
                </Dialog>
                <ImageLoader/>
                <div css={{
                    marginTop: '1em',
                }}>
                <BeatsCreator/>
                </div>
            </Column>
            <Column spanSmall={1} spanMedium={2}/>
        </Layout>
    );
};

export default LoFiMaker;

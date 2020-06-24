/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react';
import { Layout, Column } from "../Layout/Column";
import BeatsCreator from "../BeatsCreator/BeatsCreator";
import Dialog from "@reach/dialog";
import ImageLoader from "../ImageLoader/ImageLoader";
import {dark, light} from "../../styles/colors";
import "@reach/tabs/styles.css";
import MusicSelector from "../MusicSelector/MusicSelector";
import Section from "../Section/Section";
import Header from "../Header/Header";


const LoFiMaker = () => {
    const [openDialog,setOpenDialog] = useState(false);
    return (
        <Layout color={'white'} backgroundColor={light}>
            <Column spanSmall={1} spanMedium={2}/>
            <Column backgroundColor={dark} spanSmall={10} spanMedium={8}>
                <Dialog aria-label="welcome dialog" isOpen={openDialog}>
                    Welcome to LofiMaker
                    <button onClick={() => setOpenDialog(false)}>Close</button>
                </Dialog>
                <Header/>
                <Section>
                    <ImageLoader/>
                </Section>
                <Section>
                    <MusicSelector/>
                </Section>
                <Section>
                    <BeatsCreator/>
                </Section>
            </Column>
            <Column spanSmall={1} spanMedium={2}/>
        </Layout>
    );
};

export default LoFiMaker;

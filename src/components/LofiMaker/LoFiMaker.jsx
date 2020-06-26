/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react';
import { Layout, Column } from "../Layout/Column";
import BeatsCreator from "../BeatsCreator/BeatsCreator";
import {DialogContent, DialogOverlay} from "@reach/dialog";
import "@reach/dialog/styles.css";
import ImageLoader from "../ImageLoader/ImageLoader";
import {dark, light} from "../../styles/colors";
import "@reach/tabs/styles.css";
import MusicSelector from "../MusicSelector/MusicSelector";
import Section from "../Section/Section";
import Header from "../Header/Header";
import Button from "../Button/Button";


const LoFiMaker = () => {
    const [openDialog,setOpenDialog] = useState(false);
    const [finalImage,setFinalImage] = useState();

    const updateFinalImage = (imageSrc) => {
        setFinalImage(imageSrc);
    };

    return (
        <Layout color={'white'} backgroundColor={light}>
            <Column spanSmall={1} spanMedium={2}/>
            <Column backgroundColor={dark} spanSmall={10} spanMedium={8}>
                <DialogOverlay onDismiss={() => setOpenDialog(false)} aria-label="welcome dialog" isOpen={openDialog} style={{ background: "hsla(0, 0%, 0%, 0.9)" }}>
                    <DialogContent>
                        <img alt={'final image'} src={finalImage} width={'100%'}/>
                    </DialogContent>
                </DialogOverlay>

                <Header/>
                <Section>
                    <ImageLoader updateFinalImage={updateFinalImage}/>
                </Section>
                <Section>
                    <MusicSelector/>
                </Section>
                <Section>
                    <BeatsCreator/>
                </Section>
                {
                    finalImage &&
                    <Section>
                        <Button css={{
                            width: '100%'}} variant={'secondary'}
                                onClick={() => setOpenDialog(true)}>I'm Ready!</Button>
                    </Section>
                }
            </Column>
            <Column spanSmall={1} spanMedium={2}/>
        </Layout>
    );
};

export default LoFiMaker;

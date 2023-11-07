import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { AssetType } from "./Main";

const FormDiv = styled.div`
    margin: 1rem auto;
    position: relative;
    width: 90vw;
    height: 35vh;
    border: 1px solid #000;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
`;

const StyledDiv = styled.div`
width:33%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
input {
    width: 70%;
    min-height: 15px;
    margin-top: 0.5rem;
}
button {
    min-width: 75px;
    min-height: 35px;
    margin: 1rem 0;
}
`

interface Props {
    addNewAsset: (url: string) => void;
    assetsList: AssetType[];
    selectedAsset: string;
    globalPlay: boolean;
    changeAssetData: (newData: AssetType) => void;
    removeAsset: (url: string) => void
    handleGlobalPlay: () => void
}

export function isURL(str: string) {
    try { return Boolean(new URL(str)); }
    catch (e) { return false; }
}

const checkValidLink = (link: string) => {
    const list = ["jpg", "gif", "png", "mp4", "3gp", "ogg"]
    if (!isURL(link)) return false;
    const url = new URL(link)
    const extension = url.pathname.split(".")[1]

    if (list.includes(extension)) {
        return true
    } else return false;

}

const FormComponent: React.FC<Props> = ({
    addNewAsset, assetsList, selectedAsset, changeAssetData, removeAsset, handleGlobalPlay, globalPlay }) => {
    const [url, setUrl] = useState<string>('')
    const [asset, setAsset] = useState<AssetType | null>(null)
    const [ratioWidth, setRatioWidthratioWidth] = useState<number>(0)
    const [ratioHeight, setRatioHeight] = useState<number>(0)

    console.log('333', ratioWidth, ratioHeight)
    const onChangeUrl = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUrl(e.target.value)
    }
    const onAddAsset = () => {
        if (!checkValidLink(url)) {
            alert('Wrong url');
            return;
        }
        addNewAsset(url);
        setUrl('')
    }

    const deleteAsset = () => {
        if (asset) {
            removeAsset(asset.id)
        }
    }

    const handleChange = (e: any) => {
        if (asset) {

            if (e.target.name === 'width') {
                changeAssetData({ ...asset, [e.target.name]: e.target.value, height: e.target.value * ratioWidth })
            } else if (e.target.name === 'height') {
                changeAssetData({ ...asset, [e.target.name]: e.target.value, width: e.target.value * ratioHeight })
            } else {
                changeAssetData({ ...asset, [e.target.name]: e.target.value })
            }
        }
    }

    useEffect(() => {
        if (selectedAsset) {
            const elem = assetsList.filter((elem) => elem.id === selectedAsset)
            setAsset(elem[0])
        }
    }, [assetsList, selectedAsset])

    useEffect(() => {
        if (asset) {
            setRatioWidthratioWidth((+asset.height) / (+asset.width))
            setRatioHeight((+asset.width) / (+asset.height))
        }
    }, [asset?.id, asset])


    return (
        <FormDiv>
            <StyledDiv>
                <label htmlFor="assetUrl">Asset Url</label>
                <input type="text" name='assetUrl' onChange={onChangeUrl} placeholder="Enter url..." value={url} />
                <button onClick={onAddAsset}>Add</button>
            </StyledDiv>
            <StyledDiv>
                <button onClick={handleGlobalPlay}>{`${globalPlay ? 'Pause' : 'Play'}`}</button>
            </StyledDiv>
            {selectedAsset && asset && <StyledDiv>
                <label htmlFor="width">width</label>
                <input type="number" name="width" onChange={handleChange} value={asset.width} />
                <label htmlFor="height">height</label>
                <input type="number" name="height" onChange={handleChange} value={asset.height} />
                <label htmlFor="x">x: </label>
                <input type="number" name="x" onChange={handleChange} value={asset.x} />
                <label htmlFor="y">y: </label>
                <input type="number" name="y" onChange={handleChange} value={asset.y} />
                <button onClick={deleteAsset}>Delete</button>
            </StyledDiv>}
        </FormDiv>
    )
}

export default FormComponent;

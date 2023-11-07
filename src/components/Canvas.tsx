import React, { useMemo } from "react";
import styled from '@emotion/styled'
import { AssetType } from "./Main";
import VideoAsset from "./VideoAsset";
import ImageAsset from "./ImageAsset";

const Canvas = styled.div`
    margin: 0 auto;
    position: relative;
    width: 90vw;
    height: 50vh;
    border: 1px solid #000;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
`;

const checkIsVideo = (link: string) => {
    const videos = ["mp4", "3gp", "ogg"]

    const url = new URL(link)
    const extension = url.pathname.split(".")[1]

    if (videos.includes(extension)) {
        return true
    }
    return false;
}

interface Props {
    assetsList: AssetType[];
    selectedAsset: string;
    globalPlay: boolean;
    changeAssetData: (newData: AssetType) => void;
    changeSelectedAsset: (asssetId: string) => void;
}

const CanvasComponent: React.FC<Props> = ({
    assetsList,
    selectedAsset,
    globalPlay,
    changeAssetData,
    changeSelectedAsset
}) => {
    const listToRender = useMemo(() => (assetsList.map((asset) => {
        if (checkIsVideo(asset.url)) {
            return <VideoAsset
                globalPlay={globalPlay}
                assetData={asset}
                isSelected={selectedAsset === asset.id}
                changeAssetData={changeAssetData}
                changeSelectedAsset={changeSelectedAsset} />

        } else return <ImageAsset
            assetData={asset}
            isSelected={selectedAsset === asset.id}
            changeAssetData={changeAssetData}
            changeSelectedAsset={changeSelectedAsset} />

    })), [assetsList, globalPlay, selectedAsset, changeAssetData, changeSelectedAsset])
    return (
        <Canvas>
            {listToRender}
        </Canvas>
    )
}

export default CanvasComponent;

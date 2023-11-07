import React, { useEffect, useRef, useState } from "react";
import { Rnd } from 'react-rnd'
import { AssetType } from "./Main";
import styled from '@emotion/styled'

const StyledVideo = styled.video`
width: ${props => props.width};
height: ${props => props.height};
`
const LoadingDiv = styled.div`
position:fixed;
display: flex;
justify-content: center;
align-items: center;
z-index:101;
width:100vw;
height:100vh;
top:0;
left:0;
background: #000;
opacity: 0.2;
h3{
    color: #fff;
}
`


interface Props {
    assetData: AssetType;
    isSelected?: boolean;
    globalPlay: boolean;
    changeAssetData: (newData: AssetType) => void;
    changeSelectedAsset: (asssetId: string) => void
}

const VideoAsset: React.FC<Props> = ({ assetData, isSelected, globalPlay, changeAssetData, changeSelectedAsset }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const getVideoDimensions = (e: any) => {
        changeAssetData({ ...assetData, width: e.target.videoWidth * 0.2, height: e.target.videoHeight * 0.2 })
        setLoading(false);
    }

    useEffect(() => {
        if (videoRef?.current) {

            if (globalPlay) {
                videoRef.current.play()
            } else videoRef.current.pause()
        }
    }, [videoRef, globalPlay])

    return (
        <>
            {loading && <LoadingDiv><h3>Loading...</h3></LoadingDiv>}
            <Rnd
                lockAspectRatio
                size={{ width: assetData.width, height: assetData.height }}
                position={{ x: assetData.x, y: assetData.y }}
                style={{ zIndex: isSelected ? 100 : 0 }}
                onDragStart={() => { changeSelectedAsset(assetData.id) }}
                onDragStop={(e, d) => { changeAssetData({ ...assetData, x: d.x, y: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                    changeSelectedAsset(assetData.id)
                    changeAssetData({
                        ...assetData,
                        width: ref.style.width.slice(0, -2),
                        height: ref.style.height.slice(0, -2),
                        ...position,
                    });
                }}
            >
                <StyledVideo
                    ref={videoRef}
                    controls
                    width={assetData.width}
                    height={assetData.height}
                    className={isSelected ? 'selectedAsset' : ''}
                    src={assetData.url}
                    onLoadedMetadata={getVideoDimensions}
                    autoPlay />
            </Rnd>
        </>


    )
}

export default VideoAsset; 

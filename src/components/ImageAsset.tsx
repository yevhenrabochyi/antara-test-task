import React from "react";
import { Rnd } from 'react-rnd'
import { AssetType } from "./Main";
import styled from '@emotion/styled'

const StyledImg = styled.img`
width: ${props => props.width};
height: ${props => props.height};
`

interface Props {
    assetData: AssetType;
    isSelected?: boolean;
    changeAssetData: (newData: AssetType) => void;
    changeSelectedAsset: (asssetId: string) => void
}

const ImageAsset: React.FC<Props> = ({ assetData, isSelected, changeAssetData, changeSelectedAsset }) => {

    const getVideoDimensions = (e: any) => {
        changeAssetData({ ...assetData, width: e.target.naturalWidth * 0.2, height: e.target.naturalHeight * 0.2 })
    }

    return (
        <Rnd
            lockAspectRatio
            size={{ width: assetData.width, height: assetData.height }}
            position={{ x: assetData.x, y: assetData.y }}
            style={{ zIndex: isSelected ? 100 : 0 }}
            onDragStart={() => { changeSelectedAsset(assetData.id) }}
            onDragStop={(e, d) => { changeAssetData({ ...assetData, x: d.x, y: d.y }) }}
            onResize={(e, direction, ref, delta, position) => {
                changeAssetData({
                    ...assetData,
                    width: ref.style.width.slice(0, -2),
                    height: ref.style.height.slice(0, -2),
                    ...position,
                });
            }}
        >
            <StyledImg
                draggable="false"
                onLoad={getVideoDimensions}
                width={assetData.width}
                height={assetData.height}
                className={isSelected ? 'selectedAsset' : ''}
                src={assetData.url} />
        </Rnd>

    )
}

export default ImageAsset; 

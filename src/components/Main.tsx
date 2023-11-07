import React, { useState } from "react";
import CanvasComponent from "./Canvas";
import FormComponent from "./FormComponent";
import { v4 as uuidv4 } from 'uuid';

export type AssetType = {
    id: string;
    url: string;
    width: number | string;
    height: number | string;
    x: number;
    y: number;
}

export const AssetDefaultParams = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

const MainComponent: React.FC = () => {
    const [assests, setAssets] = useState<AssetType[]>([])
    const [selectedAsset, setSelected] = useState<string>('')
    const [globalPlay, setGlobalPlay] = useState<boolean>(true)

    const addNewAsset = (url: string) => {
        const id = uuidv4()
        setAssets([...assests, { ...AssetDefaultParams, id, url }])
    }

    const removeAsset = (url: string) => {
        const newAssetsList = assests.filter((asset) => asset.id !== url)
        setAssets(newAssetsList)
        setSelected('')
    }

    const changeAssetData = (newData: AssetType) => {
        const updatedAssets = assests.map((asset) => {
            return asset.id === newData.id ? { ...newData } : asset;
        })
        setAssets(updatedAssets);
    }

    const changeSelectedAsset = (asssetId: string) => {
        setSelected(asssetId);
    }

    const handleGlobalPlay = () => {
        setGlobalPlay(!globalPlay);
    }

    return (
        <>
            <h3>Canvas</h3>
            <CanvasComponent
                assetsList={assests}
                globalPlay={globalPlay}
                changeAssetData={changeAssetData}
                changeSelectedAsset={changeSelectedAsset}
                selectedAsset={selectedAsset} />
            <FormComponent
                addNewAsset={addNewAsset}
                globalPlay={globalPlay}
                removeAsset={removeAsset}
                changeAssetData={changeAssetData}
                assetsList={assests}
                selectedAsset={selectedAsset}
                handleGlobalPlay={handleGlobalPlay} />
        </>
    )
}

export default MainComponent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { Button, Card, message } from 'antd';

const CreateWallet = ({ setSeedPhrase, setWallet }) => {
    const [newSeedPhrase, setNewSeedPhrase] = useState(null);
    const navigate = useNavigate();

    const generateWallet = async () => {
        const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
        console.log(mnemonic);
        setNewSeedPhrase(mnemonic);
    };

    const finalizeWallet = () => {
        setSeedPhrase(newSeedPhrase);
        setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
        navigate("/");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(newSeedPhrase).then(() => {
            message.success('Seed phrase copied to clipboard!');
        }).catch((err) => {
            message.error('Failed to copy seed phrase!');
            console.error('Copying failed', err);
        });
    };

    return (
        <div>
            <div className='text-[#faad14] mt-4 bg-[#fffbe6] border-1 border-[#ffe58f] p-[5px] display-flex flex-start items-center text-sm'>
                Once you generate the seed phrase, save it securely in order to
                recover your wallet in the future.
            </div>
            <div className='w-full flex flex-col items-start mt-16'>
                {newSeedPhrase && (
                    <div onClick={copyToClipboard} className='py-2'>
                        <Button type='default'>Copy to Clipboard</Button>
                    </div>
                )}
            </div>
            <div className='h-[200px] mb-2'>
                <Card className='p-[5px]'>
                    {
                        newSeedPhrase && <div className='flex flex-col items-center justify-center gap-4'>
                            <div className='flex flex-row items-center gap-4 justify-center'>
                                {
                                    newSeedPhrase.split(" ").slice(0, 4).map((phrase) => {
                                        return <span className='bg-blue-400/40 px-2 text-blue-700 rounded-full'>{phrase}</span>
                                    })
                                }
                            </div>
                            <div className='flex flex-row items-center gap-4 justify-center'>
                                {
                                    newSeedPhrase.split(" ").slice(4, 8).map((phrase) => {
                                        return <span className='bg-blue-400/40 px-2 text-blue-700 rounded-full'>{phrase}</span>
                                    })
                                }
                            </div>
                            <div className='flex flex-row items-center gap-4 justify-center'>
                                {
                                    newSeedPhrase.split(" ").slice(8, 12).map((phrase) => {
                                        return <span className='bg-blue-400/40 px-2 text-blue-700 rounded-full'>{phrase}</span>
                                    })
                                }
                            </div>
                        </div>
                    }
                </Card>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <div onClick={finalizeWallet}>
                    <Button type='primary'>Create Wallet</Button>
                </div>
                <div onClick={generateWallet}>
                    <Button type='default'>Generate Seed Phrase</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateWallet;
import * as fs from "fs";
import * as path from "path";
import {beginCell, Address, Builder, Dictionary, DictionaryKey, Cell, contractAddress} from "@ton/core";
import {toNano, TonClient4, fromNano, WalletContractV4, SendMode, internal} from "@ton/ton";
import { mnemonicToPrivateKey, sign } from "@ton/crypto";
import {SnatchTresasureContract} from "./output/snatchtresasure_SnatchTresasureContract";


function decodePayload(payloadHex: string) {
    // Hex To Cell
    const payloadCell = Cell.fromBoc(Buffer.from(payloadHex, 'hex'))[0];

    // Cell To Slice 
    const slice = payloadCell.beginParse();

    // Assume that the payload is an integer (var_uint) followed by a string
    // The decoding method may vary depending on the TON contract
    const decodedData = {};



    return decodedData;
}


(async () => {
    const client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });
    const mnemonic = "entry clog tag inch kick rapid foster library dutch utility option seat hungry march have effort speed mother rough umbrella moon snap save vibrant";
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    const secretKey = keyPair.secretKey;
    const workchain = 0;
    const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const wallet_contract = client4.open(wallet);
    console.log("Wallet address: ", wallet_contract.address);


    const pubInt = keyPair.publicKey;
    let owner = wallet.address;
    let pub = beginCell().storeBuffer(pubInt).asCell();
    let init = await SnatchTresasureContract.init(owner,pub, "1");
    const deployContract = contractAddress(0, init);
    let collection_client = client4.open(SnatchTresasureContract.fromAddress(deployContract));



    const deployAddress = "EQBCLRXg4j7r71u759cDIkH7Iuhgc8gD2xNSRLMggnOv5Wlj";
    const balance = await wallet_contract.getBalance();
    console.log("Current wallet balance: ", fromNano(balance).toString());


    collection_client.getGetOrderExist(BigInt(11010), BigInt(10015)).then(result => {
        console.log("getOrderExist result : ", result);
    })









})().catch(console.error);

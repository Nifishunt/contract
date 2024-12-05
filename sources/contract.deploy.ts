import * as fs from "fs";
import * as path from "path";
import { beginCell, Address, contractAddress } from "@ton/core";
import {
    toNano,
    TonClient4,
    internal,
    fromNano,
    WalletContractV4,
} from "@ton/ton";
import { SnatchTresasureContract } from "./output/snatchtresasure_SnatchTresasureContract";
import { mnemonicToPrivateKey,sign } from "@ton/crypto";
import { buffer } from "stream/consumers";

const mnemonic = process.env.NIFI_MNEMONIC || "entry clog tag inch kick rapid foster library dutch utility option seat hungry march have effort speed mother rough umbrella moon snap save vibrant";
console.log("mnemonic: ", mnemonic);

const endpoint = process.env.TON_ENDPOINT || "https://sandbox-v4.tonhubapi.com";

(async () => {
     // Create client for testnet sandboxv4 API - alternative endpoint
     const client4 = new TonClient4({
        endpoint: endpoint, // Test-net
    });

    // Parameters
    // let owner = Address.parse("0QCLbWiE2MNNEa9ppfQxBBVQ01bo6KTAU9_CEii-Fem-OjBf");
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client4.open(wallet);
    console.log("Wallet address: ", wallet_contract.address);

    // Replace owner with your address
    let owner = wallet.address;
    console.log("owner ",owner);

    const pubInt = keyPair.publicKey;
    let pub = beginCell().storeBuffer(pubInt).asCell();
    let init = await SnatchTresasureContract.init(owner,pub, "12");

    // Load required data
    let deployContract = contractAddress(0, init);
    
    let deployAmount = toNano("0.2");
    let seqno: number = await wallet_contract.getSeqno()
    console.log("wallet_contract seqno is ",seqno);
    console.log("wallet_contract address ",wallet_contract.address);

   let balance: bigint = await wallet_contract.getBalance();

    // ========================================
    console.log("Current deployment wallet balance: ", fromNano(balance).toString(), "💎TON");
  
    console.log("============================================================================================");
    console.log("Deploying contract to address: ", deployContract);
    // return
    // deploy contract
    await wallet_contract.sendTransfer({
        seqno,
        secretKey,
        messages: [
            internal({
                to: deployContract,
                value: deployAmount,
                init: { code: init.code, data: init.data },
                bounce: false,
                body: null ,
            }),
        ],
    });

})();

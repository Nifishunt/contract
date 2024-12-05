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


(async () => {
    // Create client for testnet sandboxv4 API - alternative endpoint
    const client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // Test-net
    });

    // Parameters
    // let owner = Address.parse("0QCLbWiE2MNNEa9ppfQxBBVQ01bo6KTAU9_CEii-Fem-OjBf");
    let mnemonic = "entry clog tag inch kick rapid foster library dutch utility option seat hungry march have effort speed mother rough umbrella moon snap save vibrant";
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
    let init = await SnatchTresasureContract.init(owner,pub, "1");

    // Load required data
    let deployContract = contractAddress(0, init);
    let data = init.data.toBoc();

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
    // await wallet_contract.sendTransfer({
    //     seqno,
    //     secretKey,
    //     messages: [
    //         internal({
    //             to: deployContract,
    //             value: deployAmount,
    //             init: { code: init.code, data: init.data },
    //             bounce: false,
    //             body: null ,
    //         }),
    //     ],
    // });

    let collection_client = client4.open(SnatchTresasureContract.fromAddress(deployContract));
    console.log("============================================================================================");
    // console.log("Deploying contract is over!");
    // return

    // NewRoundMsg tx
    let nowTime = Date.now();
    console.log("now time:[", nowTime, "]");
    let endTime = nowTime + 10000;
    let newRoundMsg =  beginCell()
        .storeBuffer(Buffer.from("44d412d8", "hex"))
        .storeUint(1, 32)
        .storeUint(10000,32)
        .storeUint(0, 32)
        .storeUint(endTime , 32)
        .storeUint(1000,32)
        .endCell()

    await wallet_contract.sendTransfer({
            seqno,
            secretKey,
            messages: [
                internal({
                    to: deployContract,
                    value: deployAmount,
                    init: null,
                    bounce: true,
                    body: newRoundMsg ,
                }),
            ],
    });

// return

    let round = BigInt(1);
    let order = BigInt(1);
    let nifi  = BigInt(100);
// return
//BuyMsg message
    let dataS = round + "=" + order+"-"+nifi;; //32455143566E5A314F6E2D4A6134786641664D6273712D2D6A61746235734E6E4F554E34323141486158626562634A344E30736E6174636831
    console.log("dataS ",dataS);
    let bufS = Buffer.from(dataS);
    // console.log("signature data is ",buf);
    const signat = sign(bufS, keyPair.secretKey);

    let buyMsg =  beginCell()
        .storeBuffer(Buffer.from("761ab283", "hex"))
        .storeUint(round, 32)
        .storeUint(nifi,32)
        .storeUint(order,32)//orderNumber
        .storeRef(beginCell().storeBuffer(signat).asCell())
        .endCell()


// await wallet_contract.sendTransfer({
//          seqno,
//         secretKey,
//         messages: [
//             internal({
//                 to: deployContract,
//                 value: deployAmount,
//                 init: null,
//                 bounce: true,
//                 body: buyMsg ,
//             }),
//         ],
// });

// return
// closeRound message
    let closeRoundMsg =  beginCell()
        .storeBuffer(Buffer.from("600fd230", "hex"))
        .storeUint(round, 32)
        .endCell()

// await wallet_contract.sendTransfer({
//          seqno,
//         secretKey,
//         messages: [
//             internal({
//                 to: deployContract,
//                 value: deployAmount,
//                 init: null,
//                 bounce: true,
//                 body: closeRoundMsg ,
//             }),
//         ],
// });

// return
// drawRound message
    let drawRoundMsg =  beginCell()
        .storeBuffer(Buffer.from("021c4b88", "hex"))
        .storeUint(1, 32)
        .endCell()

// await wallet_contract.sendTransfer({
//          seqno,
//         secretKey,
//         messages: [
//             internal({
//                 to: deployContract,
//                 value: deployAmount,
//                 init: null,
//                 bounce: true,
//                 body: drawRoundMsg ,
//             }),
//         ],
// });

// clearRound message
    let cleanRoundMsg =  beginCell()
        .storeBuffer(Buffer.from("d9d7cdc8", "hex"))
        .storeUint(1, 32)
        .endCell()


// await wallet_contract.sendTransfer({
//          seqno,
//         secretKey,
//         messages: [
//             internal({
//                 to: deployContract,
//                 value: deployAmount,
//                 init: null,
//                 bounce: true,
//                 body: cleanRoundMsg,
//             }),
//         ],
// });
// return


//PrizeMsg
    let prizeMsg =  beginCell()
        .storeBuffer(Buffer.from("a1499297", "hex"))
        .storeUint(round, 32)
        .storeRef(beginCell().storeBuffer(Buffer.from("aee3b9a695667171d08bf365c87a78e3050f24b639c9edbcd614605f6b7f815d","hex")).asCell())
        .endCell()

// await wallet_contract.sendTransfer({
//         seqno,
//         secretKey,
//         messages: [
//             internal({
//                 to: deployContract,
//                 value: deployAmount,
//                 init: null,
//                 bounce: true,
//                 body: prizeMsg,
//             }),
//         ],
// });
// return


    let roundInfo = await collection_client.getGetRoundInfoState(1n);
    console.log("roundInfo ",roundInfo);

    let records = await collection_client.getGetPrizeRecord();
    console.log("records ",records);

    let txId = await collection_client.getGetPrizeTxId(1n);
    console.log("txId ",txId);
    // let dataStr = "2EQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcJ4N0snatch1";
    // let buf = Buffer.from(dataStr);
    //     // console.log("signature data is ",buf);
    // const signature = sign(buf, keyPair.secretKey);
    // let res = await collection_client.getGetSignRes( { $$type: "BuyMsg", round: 2n, nifiAmount: 1n, signature: beginCell().storeBuffer(signature).asCell() });
    // console.log("test sign result : ", res);


})();

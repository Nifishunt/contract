import { beginCell, toNano,OpenedContract } from "@ton/core";
import { ContractSystem,Treasure,Tracker } from "@tact-lang/emulator";
import { keyPairFromSeed, keyPairFromSecretKey, sign, signVerify, KeyPair, getSecureRandomBytes } from "@ton/crypto";
import { SnatchTresasureContract,loadBuyEvent } from "./output/snatchtresasure_SnatchTresasureContract";

describe("contract", () => {
    let  keypair: KeyPair;
    let  system :ContractSystem;
    let  owner: Treasure;
    let nonOwner: Treasure;
    let contract: OpenedContract<SnatchTresasureContract>;
    let track: Tracker;
    beforeAll(async () => {
      const seed: Buffer = await getSecureRandomBytes(32); // Seed is always 32 bytes
      keypair = keyPairFromSeed(seed); // Creates keypair from random seed
        // Create ContractSystem and deploy contract
      system = await ContractSystem.create();
      owner = system.treasure("owner");
      nonOwner = system.treasure("non-owner");
      let pubInt = keypair.publicKey;
      console.log("nonOwner address:", nonOwner.address);
      console.log("Owner address:", owner.address);

      contract = system.open(
          await SnatchTresasureContract.fromInit(owner.address, beginCell().storeBuffer(pubInt).asCell())
      );
      system.name(contract.address, "main");
      track = system.track(contract);

      await contract.send(owner, { value: toNano(20.2) }, { $$type: "Deploy", queryId: 0n });
      await system.run();

  });

    it("should deploy and full test fully correctly", async () => {  
        // console.log("random1 is:",await contract.getGetRandom(20n));
         console.log(
            "send new round",
            await contract.send(
                owner,
                { value: toNano(1) },
                { $$type: "NewRoundMsg", round: 1n,sum: 1000n, startTime: 0n, endTime: 0n, awardAmount: 0n }
            )
        );
        await system.run();
  
        // Check counter
        expect(await contract.getGetRoundIndex()).toEqual(2n);
        console.log("get round index result:", await contract.getGetRoundIndex());

        // check close round
        await contract.send(owner, { value: toNano(1) }, { $$type: "CloseRoundMsg", round: 1n });
        await system.run();

        await contract.send(owner, { value: toNano(1) }, { $$type: "PrizeMsg", round: 1n,txId: beginCell().storeBuffer(Buffer.from("1de067332790fb7da00a95d6f1c5fa22bad2f4f5d69fd8a4ec44cc89f9ada6fe")).asCell() });
        await system.run();

        const endTime = await contract.getGetNowTime();
        // start new round
        let round = BigInt(2);
        let order = BigInt(1111);
        await contract.send(
            owner,
            { value: toNano(1) },
            { $$type: "NewRoundMsg",round: 2n, sum: 11000n, startTime: 0n, endTime: endTime + 10000n, awardAmount: 1000n }
        );
        await system.run();

        expect(await contract.getGetRoundIndex()).toEqual(3n);
      
        let nifi = BigInt(10);   
        for (let i = 0; i < 10; i ++){ //1.11797 1.150485 0.861885 0.59123
        // Sign  buy  address
        let dataStr = round + "=" + order+"-"+nifi; //32455143566E5A314F6E2D4A6134786641664D6273712D2D6A61746235734E6E4F554E34323141486158626562634A344E30736E6174636831
        console.log("dataStr:",dataStr);
        let buf = Buffer.from(dataStr);
        // console.log("signature data is ",buf);
        const signature = sign(buf, keypair.secretKey);

       await contract.send(
            nonOwner,
            { value: toNano(1.2) },
            { $$type: "BuyMsg", round: round, nifiAmount: nifi,orderNumber: order, signature: beginCell().storeBuffer(signature).asCell() }
        );
        await system.run();
        order++;

         let i = 0;
        for (const events of track.collect()) {
            // console.log("events is ",i,events);
            for (const event of events.events) {
            

         switch (event.$type) {
          case "sent":
            event.messages.forEach((message, index) => {
              console.log(`sent event message ${index + 1}:`, message);
            });
            break;
            default:
            //   console.log("unknown message");
            console.log("event is ",event);
          }
        } 
    }
}
console.log("roundInfo : ", await contract.getGetRoundInfoState(round));
console.log("buyInfo : ", await contract.getGetBuyInfo(round,6n));
        return

         // Sign  buy  address1
        let dataStr1 = round + nonOwner.address.toString() + ++order +"-"+ ++nifi;
        console.log("dataStr1 ",dataStr1);
        let buf1 = Buffer.from(dataStr1);
        const signature1 = sign(buf1, keypair.secretKey);
        await contract.send(
            nonOwner,
            { value: toNano(1) },
            { $$type: "BuyMsg", round: round, nifiAmount: nifi,orderNumber:order, signature: beginCell().storeBuffer(signature1).asCell() }
        );
        await system.run();
        console.log("roundInfo1 : ", await contract.getGetRoundInfoState(2n));

         // Sign  buy  address2
        let dataStr2 = round + nonOwner.address.toString() + ++order +"-"+ ++nifi;
        console.log("dataStr2 ",dataStr2);
        let buf2 = Buffer.from(dataStr2);
        const signature2 = sign(buf2, keypair.secretKey);
        await contract.send(
            nonOwner,
            { value: toNano(1) },
            { $$type: "BuyMsg", round: round, nifiAmount: nifi,orderNumber:order, signature: beginCell().storeBuffer(signature2).asCell() }
        );
        await system.run();
        console.log("roundInfo2 : ", await contract.getGetRoundInfoState(2n));

    //      let i = 0;
    //     for (const events of track.collect()) {
    //         console.log("events is ",i,events);

    //         for (const event of events.events) {
            

    //      switch (event.$type) {
    //       case "sent":
    //         event.messages.forEach((message, index) => {
    //           console.log(`sent event message ${index + 1}:`, message);
    //         });
    //         break;
    //         default:
    //         //   console.log("unknown message");
    //         console.log("event is ",event);
    //       }
    //     } 
    // }
         // Sign  buy  address3
        let dataStr3 = round + nonOwner.address.toString() + ++order +"-"+ ++nifi;
        console.log("dataStr3 ",dataStr3);
        let buf3 = Buffer.from(dataStr3);
        const signature3 = sign(buf3, keypair.secretKey);
        await contract.send(
            nonOwner,
            { value: toNano(1) },
            { $$type: "BuyMsg", round: round, nifiAmount: nifi,orderNumber:order, signature: beginCell().storeBuffer(signature3).asCell() }
        );
        await system.run();
        console.log("roundInfo3 : ", await contract.getGetRoundInfoState(2n));
     
        // check owner draw winner of current round
        await contract.send(owner, { value: toNano(1) }, { $$type: "DrawMsg", round: 2n });
        let tx = await system.run();

        console.log("getRoundWinner is", await contract.getGetRoundWinner(2n,3n));

        // send reward
        await contract.send(owner, { value: toNano(1) }, { $$type: "PrizeMsg", round: 2n, txId: beginCell().storeBuffer(Buffer.from("1de067332790fb7da00a95d6f1cc89f9ada6fec5fa22bad2f4f5d69fd8a4ec44")).asCell() });
        await system.run();

        console.log("query clean roundInfo is : ", await contract.getGetRoundInfoState(2n));
        console.log("query  roundInfo is : ", await contract.getGetRoundInfoState(1n));
        console.log("query clean prize txid is", await contract.getGetPrizeTxId(2n));
        console.log("query prize txid is", await contract.getGetPrizeTxId(1n));
        console.log("get OrderExist exist",await contract.getGetOrderExist(2n,2n));
        console.log("get OrderExist is not exist",await contract.getGetOrderExist(2n,20n));
        // clean history message
        await contract.send(owner, { value: toNano(1) }, { $$type: "CleanMsg", round: 2n} );
        await system.run();

        console.log("------------------------------------------------------------------------------------------------");
        console.log("query clean roundInfo is : ", await contract.getGetRoundInfoState(2n));
        console.log("query  roundInfo is : ", await contract.getGetRoundInfoState(1n));
        console.log("query clean prize txid is", await contract.getGetPrizeTxId(2n));
        console.log("query prize txid is", await contract.getGetPrizeTxId(1n));

        console.log("=================================================================================================");
        console.log("get RoundIndex", await contract.getGetRoundIndex());
        console.log("get PrizeRecord",await contract.getGetPrizeRecord());
    });


    // it("should deploy and print faild info", async () => {
    //   console.log("get next round index result:", await contract.getGetRoundIndex());

    //   // check failed round round
    
    //       await contract.send(
    //           owner,
    //           { value: toNano(1) },
    //           { $$type: "NewRoundMsg", round: 5n,sum: 1n, startTime: 0n, endTime: 0n, awardAmount: 0n }
    //       )
    //   await system.run();
    
    //   let event = track.collect()[5];
    //   console.log("failed round is",event);

    //   // check failed admin user
    //       await contract.send(
    //         nonOwner,
    //           { value: toNano(1) },
    //           { $$type: "NewRoundMsg", round: 3n,sum: 1n, startTime: 0n, endTime: 0n, awardAmount: 0n }
    //       );
    //   await system.run();
    
    //   let events = track.collect()[0];
    //   console.log("failed admin user error",events);

    //    // Sign
    //    let dataStr = "1EQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcJ4N0snatch1"; //32455143566E5A314F6E2D4A6134786641664D6273712D2D6A61746235734E6E4F554E34323141486158626562634A344E30736E6174636831
    //    let buf = Buffer.from(dataStr);
    //    // console.log("signature data is ",buf);
    //    const signature = sign(buf, keypair.secretKey);
       
    //   // check buy not start round 
    //   await contract.send(
    //        nonOwner,
    //        { value: toNano(1) },
    //        { $$type: "BuyMsg", round: 3n, nifiAmount: 1n, signature: beginCell().storeBuffer(signature).asCell() }
    //    );
    //    let tx = await system.run();
    //    let eventBuy = track.collect()[0];
    //    console.log("buy not start round  error is",eventBuy);


    //   });


});

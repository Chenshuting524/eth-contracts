const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");
const Web3 = require("web3");
const { expect } = require("chai");
const bytes = require("@ethersproject/bytes");
hre.web3 = new Web3(hre.network.provider);

describe("ECCUtils", function () {

    let ECCUtilsMock;
    let eccu;
    let empty32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
    let empty20 = '0x0000000000000000000000000000000000000000';
    let addr1;
    let addr2;
    let addrs;

    it("Should init", async function () {
        ECCUtilsMock = await ethers.getContractFactory("ECCUtilsMock");
        [addr1, addr2, ...addrs] = await ethers.getSigners();
        eccu = await ECCUtilsMock.deploy();
    });

    describe("verifyAccountProof", function () {

        let accountProof = '0xb90e34f90211a0b741140d3a6318a3379ff67e3bb89fa9780c8aaf0fdabea6198098d792391597a0c4e5a99e315464eaf6392a999144d19f59173753996cf0981e5c148e04fc5d32a0d718273ac08000412a49c02767fff67d6d4d4c108a67082bc75dfa12174fdac0a038d3b6c562304b4e4ee6a7027783276473e734062c067aa9236aea3836e2a4e9a0c6354069b8d0fe2c1ee604a1248b51a90bacce4ac2f21225e07dc63d83fbc5ffa00a242aca34573f747041cf861bb7d41e5b194098183d0d192915e6f43eede54da0f9ea1862eb571abc0af92222417cd83d36c211da4daffa662614ab28d4499deea0907015eea2c82954a0a0bc757f9b54a7fddd2120cc0a1998a68a428052bcc259a03b451915a431e8c0d6c99dc2de4aec8792117eb7f6d7c58eedab5cfd7a33758ca0cb99a9d235236d18334c73714d695776e07368b7d5087c92be48a80ca7780b00a05d8b69b388bcba32e45754df01bda1c4183dd35507a94e2de2bfa0fa927ed790a01ea856df980fe0ad10de0805c075b7f042dced1c0ad518a1210e4e1b80ee109ba0de4c4a786ee86b865a25083400768a7c580a899c489397439b0002a8361a27eea05c72828ffbee3efaf3744d94aadaefb45fa713642c0310e9505bf2e85fb0ce4ea02f47fc136056fc81ab1ae50ea46184641b03e157129314d78d086b59903dfbb1a0f3126aa208eee8ff04ea98e78a0ecf10443685d546f4a91907fbfda662fe8dc380f90211a09103f4a1135b9f75fd25f1ddb7a556dc2c92c3bd809292fad290ed44c51ec9cea028215cc63bb8b282f90b2bae5a26de6ed0828601a1b19def64bff139f11b48a7a05a4672c87f8d864f2f7487bb844ac8fc48f60178787d91c0093b0a0f0a91ab4ba072cd65ce9ea7a398532319b9dc8de24a68e1fb204cf093bd16a9f4c81d4dd0eda0e4d0321d625b06ae6614224a55ff2d359df21ac8528d43d8bae57813f3c512d0a065ddf9a52b8d2bcaa136e2ed26c308ffb332572c9ff9915a2018f1b07a342fa8a043dc357d9a6d033d905316c499808b0c0d0d4b37fa355f504074312d921730a4a09cf5ee09061b795c036c6f22eb2a0ca69e2178058d6207876700039f027949f2a098329197f44a04470159940c9e11df711a58e8816412ab02cdedc2475115e31fa098aff63fd11ccfa9b5f06377972e66e238aad9e083d3f787c9a825ba473e2350a079192192dbe405ef459915a95b7511e6802e80bf57f4a4d664e840310ec61a48a0c487bc8e5fb7562bb943e2f81d148844e7be196df731c33a768bc009c7914d99a0045d014772a883d3d56ee282eff7936bce6d3240092f11a7efb866bf2406d6b9a0d7c2d37368aa37470bab73b697da24bcdf769f8ef1056f7e3928019b43bfe051a054a55cdef313d9b1cf11e19de0c13c77dbf89f1692fa714a2e944e01dcbb0e07a0e9d532c6e53056ecb6580fc9b3cbf75726b0be1909f25320ba4a2eea4cbcafc680f90211a0f8716ee393c51dddd03dbb0df4d2efa45c8513233f7d42dfa71669ce05faaba5a01318320ee4a0dcdfd38621d887fb601a6ff7b4abeafe313bec24e6a07f925417a016895a43fc6599bcfb06c1169d3e5270663482b3a3b7277754f883e1490a7a26a0ae0c4621c60f4be3884845ca4758bb4d6124a272e4c8259416bf5879d95e63eca032f8ced44550c817aed3e1503440ec7a9cef6f7e0cfb43056fb34a4ef531e971a0b86bed75d646921d8b1854e484a7630073d6a291b1e17205d4899e9efccfca77a0a6d2d71554e85f86804efa0442769c11918ee84d3a9a985004c6eee5085c06b7a0f63088a2c97cf5074a694478874cee1a08e34f1cbb2f35854535a15aa3cc1bffa0c81e76ff2013966e71fb13a69055e0d7902c4b1ffe16f4b631f84149ff6d63a7a0e1efae81604bca3a97993542e94fc3bb1515285bf6b0611c27e719f22e24c1c0a050ae095a2dbb29ef45819c896c9e76b925bae9d8aed3d25bcd0396844f695512a03e7d8c2f7e7b47a2dc32a2d2eca44776407e8dfa1b47f2af29a58a4da37e9e8da0a5faab169bf76c36892fae1aa9b1d0b0d751c00e27f5f62bb0aa7535b643922aa0add12c7750f5489f8eafad74404e3271e460b9700824668599772276e82e37b0a03f3a068b40ed8694709e3a09a15293fc57efc7584894bfa9e2673d600c2d3927a0488f598b0d87617c288382e3165b1d905b457c0d714ce87c8ef29a17ffda4cf080f90211a03791718f24ec0d075d271c2a747469f86e4ec80dbd02abde23a000247f0fd60ca00ffff60b659758ba241c4b6b6172c98a77313ddaa3cba1f90cfecbad43b40d95a0669057ff7dfe0570c0574fa12b63669f3a1f301f6d3d66086d7b45afa6464a9fa0c676aa4205537893fb89bcb1843de2bfca789155ec79136c0d83a3c935747f27a0c74fd524eea3c8c27e7f321e8667fdda138fa95beed00829ce70680183c4def2a0e2656dfa1de703af58e027cc73b6e6c0cc4108334b4960cde0453b83803f3e80a00aa05181348042d171583e7e5995f1d4ec8826d73792909a9effe9af72f69123a0106636d7b70674e206c31c14a2a25acf62bebc9e1d80c8488df1363c1e38813fa0d0176a180120a15dccfd4f0303c9606df8eb43618ec3c9b867746faf03eea31ea0f4e46fccc0219acf1c3c77a7d9ad48de815cdeaeba250c60d57ec491fc5cfe52a06d836a64bcd12166dae91d28fa4a7697f963d6a058e364c6773733d58b9272faa0798c6db0eeda2f013592434c5bfa9ddd421d929d764899bfed5178ac3f9190c5a03cc0bb14dc4d16846dbd840189aa93828602e194e87302ee854ef0ae409e8772a07fee766c12d118209c1762047d4d59dc00e210ac0777828ac4830bbf667fbd11a011b715b76f357e822649aa64b1248c2555a9745c1094966d3cdb07e4c91e88b9a02a4caa5cc29911dd3a651260e35afa493a8262548a2a2c23499da6d004dc3ba080f90211a00fcb2b8e33d8534225f2658b37c7c77ee53f30adcac18923c44c3218ae715842a01b48f71fa960f75f14228c0d83b9c230a3b8d719cc8dbbe7586ec61c9716641ba0c322d340c50ba4d1d8cfbd7b0069dca36ca653d87bbadf0dfdebca93eb2148f6a0f2f74a5fa1dda9960bf858b5f5ebd2aef491070f6f16a06ca608291d3895803fa098062c1354c0b90834b0979ee49fba0df675d9af6cf03e4512610296797bc377a00d89a8a8551ad2f21abcc5a5f0ecd6eb7bfa69dcb3aa5edcf506c8648340b3d2a088855a465d789237a4b54afecf7d4a3ab39c4656ffba364fef2dd3e0e8391612a00a4deaf50f402651d43b6213f625011a3466de8214f58d803e9ecfb9c6d32f31a021eb5e5135d77ac459f32aa99843ac50cdab749fd0e733ff478bc51dcdb5638da098aa811c9c145224069e24d558efda6f7c64e1d886394c6fe8892fae95a3922ba005d95fe792634d32ead3406168c7d2c0ded050e47c652cd6f2fb473e29ab0f79a04653b9e5a5fffa6e8c92d9cc3fa7fe42239942db03833aa9e4f210571399d174a01b14d6732668376797dec7a1da1b84d2b59d611324adc902660a92d12d3d4722a0c614db8a884fd513a2367447182e028e0dbaf9b5611acc1b7dbe12a3beebd987a0e328066c1167c02968dc8eab0ce4a4acfacc1b73b37e37f44204ece1ad07a2a9a0e4be8aa9a188a76453218513eccda6c2fe4ad61b1cd43970d64a1e92c8b63c9680f90211a0ee940971034a948744d99fbc58addd15a579e2d85a4f65fcb805f0eeed67bf4fa038ed332850bf07d19e022fb5d949d4fa17863c27788525eb5a4c6ced2568efb6a0e970b422efc8c39b8ed1b6ed57f163027eff6ce3b35277528264299ee25990e7a0be241ddd1c79f5f34fe4e059773d084d6fa4f30939a9b0ce3acdee3c03f97a22a09e814449c24dad2bf119541863cebd094f803666e7dd499fa76d9afd3a1af29ea021c860a5f7a50b183ef2cf2b1cfa7ff4457fc0e0ac5ebce5e826a44a02471f8da0f144e39fb40ae9528759fb524d64274ccffc044339cc56751f9335942d47b6c5a0f5f1ea3b4c496fcf2c86cf622e90083787d3b159304936d858dd7454302abf66a0b124f85d96b311bbc255135e0bec0d3ac4437da0003edaeaf3cdff05038144efa0d17bb8aa7775a9ed5746c47504a123f194cdee2d4a7c48cc36272120061588f6a0eb75ebdd6fde798d6e8e4b0eac8ae24b46e70a7bf6a94b6c9f34d38cfaf2a4bca0274e9ebb63919d9491b5cdeea4810b1eb7e4bf30eaf8f2be3c832638c06ec0c2a067df00968f1926dc7e5b26079156e3c496d61b9bb601fed5bbbce627c651d790a0ecf18162af98abd61084233499216ae327f78655bc49d36463238bfad8dd9cb2a0c898d513f8446f4dc600d16dfb5ae11e219fc22b2fabb136d3f9e244ab9fcc40a05dc97cd537c68b8f8083c82cbbc2812ff47dd211fed57526e4649a743a4f1e3480f90151a0f0193db74be08058606b46ebb78cc3911465de28ed81fd59466e24bbb73cd2e880a02833bf6404301c0d0c52eef381415ffdbc3badc79747c3e44395dbbc151e706180a0152e0e6aed172abc678ab7ae41870b45dfdf8ed0329c30b28c8eb3cfb99b7b8a8080a074a07e62ec8601cb080a74b071acc9cc23ee134079137c7c4955b7603fd916c3a08185c4940af6b500466b727eaaa1607a7f60fb947c75d52d08bbd68e5898f11ba057c58a71ea1b2d4cd8db94c73fee1a0d402e2a88f149f2ac0577a65ce043763b80a001dd15f3e3e3ad962529522fec84b2fb9285a1933b471cce2446148488025857a00fa778a067f12adcf5d967ba4b75055a0c76801028127451bf3047c693344abb80a05f8715aacb30c8680edd6f5776e119902cc4747dac42a485c9d79fe0181a6125a00e8c1fdf2da7e992a26589d2f8efa93eb70a27dd5b1eb985541b1c7a8d6842f580f8669d3837e47e9d97fea44bf893a771a304a3232304719598eff3743ca7ae4bb846f8440180a06b58bbd6d52464ecf91852537153b98ae5d05872cd57ef8777e3a158c7158bf0a0614777117c0a31bb33af852628e78b108a6e6e6b3bb9e938deaaee7e2b033adb';
        let headerRoot = '0xb2d2e3feec4af059219e8afdbabfcf4df54aa2a0374bb0206abc4685c60879dc';
        let address = '0xcf2afe102057ba5c16f899271045a0a37fcb10f2';
        let storageProof = '0xb907b5f90211a07ed39b0406d98b1bd4ac969de62251c28166aef8f69e29b63696e872ac189487a0ac5f460011f98632c2a89a230d74496a0f24238ec31b81b976d4e13003c72d6aa0a8fdd52d18c3f32422d855da308c2952d8c3e62d32c7485181002f65ab8b57afa085cbdc3a0cba369c10c95e410f47252771eae14302875332613fa2272185d7b0a0bbb7b4b8517476dbd93814a4261eed6f9c97ca10cd0013cf21a9bffe69f03bdda02b7e730e92a8a17afc75ce75c92392f14f3afa32043e5b657c5591f93e008efaa06031d69caf4b044c76bfb7a5d5858f6379ca738604e6fef330a3b7fc934c6dfaa039a81cf4ec43adc442aeb8d39d0bfb8aea825717d6ec84edaef8a3171b355a6fa0397bc9286b2e7f5a11345fbc1e53723b51574327f4f579c00f271c7cf170c282a040d05c1bac2e6704974b0220b40c98063474954c785440d839079600577e6823a0b0e04d24a63cb027e5fd79eced2cbc22ff9de4e06d5a35ba334962bc651a3c5ca0c1cc67cabe19054542e3868189a139d914a682c079fe24e74ed36d1e6a47b898a0052e33c422e91910ce324727b67906b3ae99c6d743a006864cd27b1db94bc079a0e30908e2fdbf74787f9f314166d71375297e65f616b50241259b2552a454f109a04e8a0da0f4d104807c9179eac1593444c6faa383217e72be55632f3b4a8f82d6a0abcdf9e280b03116a508f9e884d020db4fa6f8c6f99a9876c505e96bb2b1c1ee80f90211a0e8a177164a0903af248c1ce6e407aa3757c2b6e938365119d72680966834944fa0a711179d5280d7807b586b6c6c00a57862d94a74a70622184fe359e6a09fe72fa07f3c6e247a4299cd7363cc1f4c17a095fd3faf2a1e354cbf9181cbb8d89fc369a07e1aead1e3fc3fe359c7d171930b78ec54be8c46f6c14efc279f251725913f0fa0109cead3dc197d9277fb5e2ee00ffcd12f7041371ac2eb0327922b10d4e26b16a0ed93a1e844d80ba5a171225d21389aae47ec2f3716f8b4e3b2e1a133504043e8a090fd100b80e8158b315854543af17087f8857e54184db7bc3d9de77fda32a0bda0851eee7ce719e6a015ec9c875508ac9905c4a2eccda37316446956afcf4e23baa0d2a294eeae765264513ccca891aa919d34c69b3111b835f63c8737d352668009a019285dbf4f245f329403d24543ad83274ecc3284d4c57cc3a88b3ce1ea1ac11ca0d4629a9597ed272e17b235ad29c7da794ee32760ba098bdd7d14b6e810f24368a09c336ad8430de2df7f43ec60444a4ed070ad13922ddab175d86f91addd963297a0a868e36c2bb51e60dd302a18bd778ee75b322b970a08a3649134a8a10e1aba81a07b1a01c6802541dd28d535ae227ac6c98f0ef33f145adf82a4b96852ec6f3f73a0dcc13ebca88dbd8a0c55faeed20caccb28d62a502cf0db77b485784c57c3bf80a0a87e59e39a094f2913274ab52a8de1cf792927ac7d5fee29cdf562e245d0dc2e80f90211a01757917e9224d8e39d6c944a96ced33c52745a1c06314a6ae5c1ef0028ae02b9a0eba8b1fb250c33e15be6403379c85a3f474632f94551e21d2021b835ef1cf16da0971be97201d6089d0284e9ce1390dbb801ea7f7e949d8d27a24c129f152563c1a0a19c1d33affc5b418fd755923e54e9120e474f6b0d2a349cba84b90a0f66ddd4a08a5b25f5767d0654bc9f7ad9bf5bdc498d23e01b768dd2f0ad8932da48614c12a0d9b92383870f2d89401c36ff30cfd1a534c36d15798aae97eb04b9c430694672a0db39ea934e865b4258aa27a1d15d88c8a708b788245f62ea40382c5955a4c011a0c30b5709545fd2f8ba396bc05d72c7f8d5b307707b36971687e6337585576b4aa05c195afb8eceff2cb8956a4c9fd5627f84a5a3f29b75bfca08cf0ab4426f1820a052e65038019b745358c010b86d25da81f8f328e5972821d5a7626c868348a0e3a06d990082b50c7e9ecc641184adafb135659c66e9cb29a423932f511578cb7126a0761b5db9f8e3a19c119684b48a869ac32abd1288905666224112996815d8b499a087be60024fb57677ffc530ce6e9ffe48b1c4a5656466a7a986a6ef0ba4fd44b6a01ebeaf5225b5edc45237db4838fdcf8fbd9f282e3286ef5b1bd54e8d1a3ce027a00f76986377197ea90ee95620eac59eae4d454c9620f6bca769bc90a5984b244ea0c34a527eec08998e829b2df246b503c28551b6f65ca6a0aa3b4350cb17200f8c80f90151a0744d00ff280e769c2daf908c1e8a4b5e5ea9a653295deb0d07160d83eac7435aa010ef6734ed120f8f8ee079d2bf6db2a234d731e7d08c2f31e4738abc0d8443568080a01755a82d129503f82ff0a92265bb8d056a81456a346b788522aad848a99e000580a0ea8e41e2016c801b99b2bf7333bc5f27283388df703546c69d69057b21b085a8a04cf623a5154bdf4f33ccdfc4d4ab38b8165adb1592c425d49cb877244a2fa68280a084d71f99e326177e070f1618a05fb1bb9e3257cc9ea9c2e9cdc367943f41c4dda0a40b555d93923c9fd96e0ad671c722335b0812cd3e451d95b76e2dce5e38cd6580a080a3d9222507178bb567c5e1041070f041661bf60179e5595b044b10cb88fb8580a0334e35ff43871b958ff4b604161c6da0288f61a12316ed4f0a377d3fc06df37aa02081102b6f79d26a1ca5984a8abd89cf434be02ca2f2c4862494dc34dde73fe880e49f2087fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace838277d7';
        let invalidStorageProof = '0xb907b5f90211a07687280b5ba058a93b413af112a130a8d39637c247f8d85192a7c67c70ee3950a09cb1f22c785aa679546ca918b95aa6c5104599632ffddbc5a1d512fddd2ef71fa055c8df2b2e43e8a5eea117ab89503f37322511e79cf85b8cfce984b28b7a2aa1a08e0962297f7a46090c3b032219747225116e76d6ebc1bafef7be592de9e1bfa2a0377dd047779e0391709fb1ea4ff97a994de6e7aeba1495f233dc75c365f38216a027f4962abe05821d4fcfd5f0e904698030352123a7f712dfbc614e96661ed063a0424b3a3cf2ab62f6c30dd3c3b6ebdefb0845b2f8fb4be70616ace3d9cb161817a0d5bab3d07df6d090da36de41ab18c22c23d29b6687ff1e8f375f1993d979c93ea089f2ad61b3afb974b8b79d2d55448537b539d17224f8e1cc2ed295322aab010ca0d64da88dd795554c52ec51ae52a16ada35cae4e6b7e4668eb41d6e74cf27640fa0caeccfa6e0d12f1294d875a0f050605e313925586b2d3f2493444f0c6869d0dfa097a42c039fa8d4905ec2c04fd2e72c24266ff79b9c87b850bef961daff7a6fb3a0df45dd7904409da0b383f85db1ef4c48f3122adc9b5abf27ccb60ef289fea54da04178aa4710a49814f40094eb21ad07261080bdba8c1451a2e45b4ed1361a0c13a0620d569ac2590827749739a545f47f237e8e2680bef2374327fad845c8296c93a0e95707a43973f82676ce9b35e3b7f2fdfba4e45a0b881d83cf82f36123ca930080f90211a0b037fdbdf256ff0ecca12de327d220ff28b3f3d312cc2e8b70e34586739e5c81a0fc894be17703ca157bf8f71587b42d0edca445b0720539201e68ee082af7eb6ba05cbda5d75281c8e1077b80785fa479301fd19ddbc6294e8c9a0624ed3fb96a76a0ba46ed4b15b5a6d555af8936388de319ba0235e9133df4afe88ec352d47df36fa0ff27f15fbe221fabec8e1ee1f0d1636de5fc1e6b125e2078032fc9aabdf03c05a0530e5949f4f4c3e7d2e289033332e823bf8ff1eced5fd0d58f6a1d7472944275a0cecb7c33f85f57fef3332095ff42dcaadbeb628119489fa8208a0a8c73a32436a028278f80ac8f391556534ea318023f52e771fe2a7743a745ab1bf58573a4133da04dfa02bb84ff96b50105e701b21822a529f3dbc9f0f6fe59fe219e8520221b27a0741c90073feccaa156ba8be321eb940f04614fba23157986e2e3b426277d53a7a0fdce8171737b54cc5ed4d53d23feef560f7035ec7dc34e33428e2caefd50d82ea0e852d38aeeb1862f232352c139ad640e857e7565e7a6d667b2196074dcac7a3ea05429a515bcf40e1cbc650bfca440e1a41d5fd0b9684764028a850ed66d69b17ca03447aa76626b769e552d4a98e336a79c083015665b5af3f4b5e6314f4592aecfa0bbd0785e0b664b80a3baf8130348df9e1e18fc5dcae41a9c9888df41486a9d08a0c09fcaf04068f935ef9bcbb4819c0cdc5cfc5ea68feedd4fe6cabc9c83e7561480f90211a05149ec605b794803218602aea6a0c8c8f2f4cb67435bf252225b2126ee219d48a0b9c3d332d3ed112cfddfdcf94ec567e7d900255ea7019035de992e0a11a10047a0a0150e15e0a12f891fd0191eb1777c709c5f994d9d3cbb0fb11dba6e6b779395a0e3804dd5ea32d1d04f20713c9feae3f47ab55f37b9ae300118a194764ed34c91a0f759bc4b416e2fa1ab4985eb97add20796e1d9be8a00cee66d60a7a32eebe465a071cd26dbffe9cd773fcd505876366427c6b85f9a17ee98ecdae0a6eaa776d1d3a0828996a14daca6697b777f99d05464f1f27caffb242892acae6d4b952a96ca90a0808f3bc9523251abeab1fc1321b9248aeaa495cf14a977f1e482153b6e9bfeada045b5a0071ea3f220397cf1d3971cd29aa50fc9636613f5e69937c7b31e565414a0086202c405274eef66d29e86ee76d933c3debb4cc4e182373b6980ee2c606b4ca0777206af7ac6d1cd3ebc0d5320553c7550ddd8eb1d6b00350aa9d4753c1fb136a0f149f52d5625645ee858246d3294ca169afaa6c146313b15c1c86b2cf4bccd43a0cd6293863bde44dd4a1df7c7919538617e8f107140562087ae2885c35758702ea00d1e699c3613983556a77316d656b67831c13c5e069fb18e2e96e0ed1a80a21da0424155278afe97e32747e3c25fd3340e68e6350a9ea7a06327368064c074d6a5a0c34a527eec08998e829b2df246b503c28551b6f65ca6a0aa3b4350cb17200f8c80f90151a0744d00ff280e769c2daf908c1e8a4b5e5ea9a653295deb0d07160d83eac7435aa010ef6734ed120f8f8ee079d2bf6db2a234d731e7d08c2f31e4738abc0d8443568080a01755a82d129503f82ff0a92265bb8d056a81456a346b788522aad848a99e000580a0ea8e41e2016c801b99b2bf7333bc5f27283388df703546c69d69057b21b085a8a0b0889dcbe633df5eb88b7a612bb25bd685c5d661dbd38b6819d0c197ab30e07680a084d71f99e326177e070f1618a05fb1bb9e3257cc9ea9c2e9cdc367943f41c4dda042d09c033a316c486dd6052b725fefc6d575ecb1a92389ed51db07236cde662180a080a3d9222507178bb567c5e1041070f041661bf60179e5595b044b10cb88fb8580a0334e35ff43871b958ff4b604161c6da0288f61a12316ed4f0a377d3fc06df37aa02081102b6f79d26a1ca5984a8abd89cf434be02ca2f2c4862494dc34dde73fe880e49f2087fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace83828a1c';
        let storageIndex = '0x0000000000000000000000000000000000000000000000000000000000000002';
        let storageValue = '0x8277d7';

        it("Should return correct value if ok", async function () {
            expect(await eccu.verifyAccountProof(accountProof, headerRoot, address, storageProof, storageIndex)).to.equal(storageValue);
        });

        it("Should fail with wrong root", async function () {
            await expect(eccu.verifyAccountProof(accountProof, empty32, address, storageProof, storageIndex)).to.reverted;
        });

        it("Should fail with wrong address", async function () {
            await expect(eccu.verifyAccountProof(accountProof, headerRoot, empty20, storageProof, storageIndex)).to.reverted;
        });

        it("Should fail with wrong storageProof", async function () {
            await expect(eccu.verifyAccountProof(accountProof, headerRoot, address, invalidStorageProof, storageIndex)).to.reverted;
        });

        it("Should fail with wrong storageIndex", async function () {
            await expect(eccu.verifyAccountProof(accountProof, headerRoot, address, storageProof, empty32)).to.reverted;
        });


    });

    describe("verifyProof", function () {

        let proof = '0xb907b5f90211a07687280b5ba058a93b413af112a130a8d39637c247f8d85192a7c67c70ee3950a09cb1f22c785aa679546ca918b95aa6c5104599632ffddbc5a1d512fddd2ef71fa055c8df2b2e43e8a5eea117ab89503f37322511e79cf85b8cfce984b28b7a2aa1a08e0962297f7a46090c3b032219747225116e76d6ebc1bafef7be592de9e1bfa2a0377dd047779e0391709fb1ea4ff97a994de6e7aeba1495f233dc75c365f38216a027f4962abe05821d4fcfd5f0e904698030352123a7f712dfbc614e96661ed063a0424b3a3cf2ab62f6c30dd3c3b6ebdefb0845b2f8fb4be70616ace3d9cb161817a0d5bab3d07df6d090da36de41ab18c22c23d29b6687ff1e8f375f1993d979c93ea089f2ad61b3afb974b8b79d2d55448537b539d17224f8e1cc2ed295322aab010ca0d64da88dd795554c52ec51ae52a16ada35cae4e6b7e4668eb41d6e74cf27640fa0caeccfa6e0d12f1294d875a0f050605e313925586b2d3f2493444f0c6869d0dfa097a42c039fa8d4905ec2c04fd2e72c24266ff79b9c87b850bef961daff7a6fb3a0df45dd7904409da0b383f85db1ef4c48f3122adc9b5abf27ccb60ef289fea54da04178aa4710a49814f40094eb21ad07261080bdba8c1451a2e45b4ed1361a0c13a0620d569ac2590827749739a545f47f237e8e2680bef2374327fad845c8296c93a0e95707a43973f82676ce9b35e3b7f2fdfba4e45a0b881d83cf82f36123ca930080f90211a0b037fdbdf256ff0ecca12de327d220ff28b3f3d312cc2e8b70e34586739e5c81a0fc894be17703ca157bf8f71587b42d0edca445b0720539201e68ee082af7eb6ba05cbda5d75281c8e1077b80785fa479301fd19ddbc6294e8c9a0624ed3fb96a76a0ba46ed4b15b5a6d555af8936388de319ba0235e9133df4afe88ec352d47df36fa0ff27f15fbe221fabec8e1ee1f0d1636de5fc1e6b125e2078032fc9aabdf03c05a0530e5949f4f4c3e7d2e289033332e823bf8ff1eced5fd0d58f6a1d7472944275a0cecb7c33f85f57fef3332095ff42dcaadbeb628119489fa8208a0a8c73a32436a028278f80ac8f391556534ea318023f52e771fe2a7743a745ab1bf58573a4133da04dfa02bb84ff96b50105e701b21822a529f3dbc9f0f6fe59fe219e8520221b27a0741c90073feccaa156ba8be321eb940f04614fba23157986e2e3b426277d53a7a0fdce8171737b54cc5ed4d53d23feef560f7035ec7dc34e33428e2caefd50d82ea0e852d38aeeb1862f232352c139ad640e857e7565e7a6d667b2196074dcac7a3ea05429a515bcf40e1cbc650bfca440e1a41d5fd0b9684764028a850ed66d69b17ca03447aa76626b769e552d4a98e336a79c083015665b5af3f4b5e6314f4592aecfa0bbd0785e0b664b80a3baf8130348df9e1e18fc5dcae41a9c9888df41486a9d08a0c09fcaf04068f935ef9bcbb4819c0cdc5cfc5ea68feedd4fe6cabc9c83e7561480f90211a05149ec605b794803218602aea6a0c8c8f2f4cb67435bf252225b2126ee219d48a0b9c3d332d3ed112cfddfdcf94ec567e7d900255ea7019035de992e0a11a10047a0a0150e15e0a12f891fd0191eb1777c709c5f994d9d3cbb0fb11dba6e6b779395a0e3804dd5ea32d1d04f20713c9feae3f47ab55f37b9ae300118a194764ed34c91a0f759bc4b416e2fa1ab4985eb97add20796e1d9be8a00cee66d60a7a32eebe465a071cd26dbffe9cd773fcd505876366427c6b85f9a17ee98ecdae0a6eaa776d1d3a0828996a14daca6697b777f99d05464f1f27caffb242892acae6d4b952a96ca90a0808f3bc9523251abeab1fc1321b9248aeaa495cf14a977f1e482153b6e9bfeada045b5a0071ea3f220397cf1d3971cd29aa50fc9636613f5e69937c7b31e565414a0086202c405274eef66d29e86ee76d933c3debb4cc4e182373b6980ee2c606b4ca0777206af7ac6d1cd3ebc0d5320553c7550ddd8eb1d6b00350aa9d4753c1fb136a0f149f52d5625645ee858246d3294ca169afaa6c146313b15c1c86b2cf4bccd43a0cd6293863bde44dd4a1df7c7919538617e8f107140562087ae2885c35758702ea00d1e699c3613983556a77316d656b67831c13c5e069fb18e2e96e0ed1a80a21da0424155278afe97e32747e3c25fd3340e68e6350a9ea7a06327368064c074d6a5a0c34a527eec08998e829b2df246b503c28551b6f65ca6a0aa3b4350cb17200f8c80f90151a0744d00ff280e769c2daf908c1e8a4b5e5ea9a653295deb0d07160d83eac7435aa010ef6734ed120f8f8ee079d2bf6db2a234d731e7d08c2f31e4738abc0d8443568080a01755a82d129503f82ff0a92265bb8d056a81456a346b788522aad848a99e000580a0ea8e41e2016c801b99b2bf7333bc5f27283388df703546c69d69057b21b085a8a0b0889dcbe633df5eb88b7a612bb25bd685c5d661dbd38b6819d0c197ab30e07680a084d71f99e326177e070f1618a05fb1bb9e3257cc9ea9c2e9cdc367943f41c4dda042d09c033a316c486dd6052b725fefc6d575ecb1a92389ed51db07236cde662180a080a3d9222507178bb567c5e1041070f041661bf60179e5595b044b10cb88fb8580a0334e35ff43871b958ff4b604161c6da0288f61a12316ed4f0a377d3fc06df37aa02081102b6f79d26a1ca5984a8abd89cf434be02ca2f2c4862494dc34dde73fe880e49f2087fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace83828a1c';
        let root = '0xda929e3057a947262f252e7e6d821d03af1652d1fcc923c7b3e8e43195ad9e72';
        let key = '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace';
        let value = '0x828a1c';

        it("Should return value while ok", async function () {
            expect(await eccu.verifyProof(proof, key, root)).to.equal(value);
        });

        it("Should revert if key is invalid", async function () {
            await expect(eccu.verifyProof(proof, empty32, root)).to.be.reverted;
        });

        it("Should revert if root is invalid", async function () {
            await expect(eccu.verifyProof(proof, key, empty32)).to.be.reverted;
        });

    });
    
    // TODO
    describe("verifyHeader", function () {
        let headerHash = 0x1234;
        let validators = [];
        let rawSealsValid1 = 0x1234;
        let rawSealsValid2 = 0x1234;
        let rawSealsInvalid1 = 0x1234;
        let rawSealsInvalid2 = 0x1234;

        it("Should return true while there is enough valid seals", async function () {
        });

        it("Should return false while there is no enough valid seals", async function () {
        });

        it("Should return true while there is fake seals and enough valid seals", async function () {
        });

        it("Should return false while there is fake seals and no enough valid seals", async function () {
        });

    });
    
    // TODO : TO BE COMFIRMED
    describe("verifySeal", function () {
        let header = '0x1234';
        let headerHash;
        let seal1;
        let seal2;

        it("should generate headerHash & sig", async function () {
            const EthSigMsgGen = await ethers.getContractFactory("EthSigMsgGen");
            let smg = await EthSigMsgGen.deploy();
            headerHash = await smg.msgToEthSignedMessageHash(header);
            let hash = await smg.hashMsg(header);
            seal1 = await addr1.signMessage(bytes.arrayify(hash));
            seal2 = await addr2.signMessage(bytes.arrayify(hash)); 
        })

        it("Should return signer while seal is valid", async function () {
            expect(await eccu.verifySeal(headerHash, seal1)).to.equal(addr1.address);
            expect(await eccu.verifySeal(headerHash, seal2)).to.equal(addr2.address);
        });

        it("Should return address(0) while seal is invalid", async function () {
            expect(await eccu.verifySeal(headerHash, empty32)).to.equal(empty20);
        });

    });

    describe("hasEnoughSigners", function () {
        let validators = ['0x1111111111111111111111111111111111111111','0x2222222222222222222222222222222222222222','0x3333333333333333333333333333333333333333','0x4444444444444444444444444444444444444444'];
        let signersValid = ['0x1111111111111111111111111111111111111111','0x2222222222222222222222222222222222222222','0x3333333333333333333333333333333333333333'];
        let signersInvalid1 = ['0x1111111111111111111111111111111111111111','0x2222222222222222222222222222222222222222'];
        let signersInvalid2 = ['0x1111111111111111111111111111111111111111','0x2222222222222222222222222222222222222222','0x5555555555555555555555555555555555555555'];
        let signersInvalid3 = ['0x1111111111111111111111111111111111111111','0x2222222222222222222222222222222222222222','0x0000000000000000000000000000000000000000'];

        it("Should return true while there is enough signers", async function () {
            expect(await eccu.hasEnoughSigners(validators,signersValid)).to.equal(true);
        });

        it("Should return false while there is no enough signers", async function () {
            expect(await eccu.hasEnoughSigners(validators,signersInvalid1)).to.equal(false);
        });

        it("Should return false while there exists invalid signer and no enough valid signers", async function () {
            expect(await eccu.hasEnoughSigners(validators,signersInvalid2)).to.equal(false);
        });

        it("Should return false while there exists address(0) and no enough signers", async function () {
            expect(await eccu.hasEnoughSigners(validators,signersInvalid3)).to.equal(false);
        });

    });
    
    // TODO
    describe("decodeHeader", function () {
        let rawHeader = 0x1234;
        let root = 0x1234;
        let number = 0x1234;

        it("Should return block.root and block.number", async function () {
        });

    });
    
    // TODO
    describe("getStorageSlot", function () {
        let zionTxHash = 0x1234;
        let toChainId = 0x1234;
        let slotIndex = 0x1234;

        it("Should return correct slot index", async function () {

        });

    });
    
    describe("type conversion", function () {
        let _address = '0xffff111122223333444455556666777788889999';
        let _bytes32 = '0xffff111122223333444455556666777788889999aaaabbbbccccddddeeeeffff';
        let _uint256 = 0x12345678;
        let _uint256Hex = '0x0000000000000000000000000000000000000000000000000000000012345678';

        it("bytes32ToBytes", async function () {
            expect(await eccu.bytes32ToBytes(_bytes32)).to.equal(_bytes32);
        });

        it("uint256ToBytes", async function () {
            expect(await eccu.uint256ToBytes(_uint256)).to.equal(_uint256Hex);
        });

        it("addressToBytes", async function () {
            expect(await eccu.addressToBytes(_address)).to.equal(_address);
        });

        it("bytesToBytes32", async function () {
            expect(await eccu.bytesToBytes32(_bytes32)).to.equal(_bytes32);
            await expect(eccu.bytesToBytes32(_address)).to.be.reverted;  // invalid length
        });

        it("bytesToUint256", async function () {
            expect(await eccu.bytesToUint256(_uint256Hex)).to.equal(_uint256);
            await expect(eccu.bytesToUint256(_address)).to.be.reverted;  // invalid length
        });

        it("bytesToAddress", async function () {
            expect(await eccu.bytesToAddress(_address)).to.equal(_address);
            await expect(eccu.bytesToAddress(_bytes32)).to.be.reverted;  // invalid length
        });

    });
    
    // TODO
    describe("encode & decode", function () {
        // validators
        let rawValidatorBytes = 0x1234;
        let validators = [];

        // EpochInfo
        let rawEpochInfo = 0x34;
        let epochStartHeight = 1;
        let epochEndHeight = 2;
        
        // CrossTx
        let rawCrossTx = 0x12;
        let ziontxHash = 0x12;
        let fromChainID = 0x12;

        // TxParam
        let rawTxParam = 0x12;
        let sourceTxHash = 0x12;
        let crossChainId = 0x12;
        let fromContract = 0x12;
        let toChainId = 0x12;
        let toContract = 0x12;
        let method = 0x12;
        let arg = 0x12;


        it("decodeValidators", async function () {
        });

        it("encodeValidators", async function () {
        });

        it("decodeEpochInfo", async function () {
        });

        it("encodeTxParam", async function () {
        });

        it("decodeTxParam", async function () {
        });

        it("decodeCrossTx", async function () {
        });

    });
    
    describe("checkNodeHash", function () {

        let proof = '0xb907b5f90211a07687280b5ba058a93b413af112a130a8d39637c247f8d85192a7c67c70ee3950a09cb1f22c785aa679546ca918b95aa6c5104599632ffddbc5a1d512fddd2ef71fa055c8df2b2e43e8a5eea117ab89503f37322511e79cf85b8cfce984b28b7a2aa1a08e0962297f7a46090c3b032219747225116e76d6ebc1bafef7be592de9e1bfa2a0377dd047779e0391709fb1ea4ff97a994de6e7aeba1495f233dc75c365f38216a027f4962abe05821d4fcfd5f0e904698030352123a7f712dfbc614e96661ed063a0424b3a3cf2ab62f6c30dd3c3b6ebdefb0845b2f8fb4be70616ace3d9cb161817a0d5bab3d07df6d090da36de41ab18c22c23d29b6687ff1e8f375f1993d979c93ea089f2ad61b3afb974b8b79d2d55448537b539d17224f8e1cc2ed295322aab010ca0d64da88dd795554c52ec51ae52a16ada35cae4e6b7e4668eb41d6e74cf27640fa0caeccfa6e0d12f1294d875a0f050605e313925586b2d3f2493444f0c6869d0dfa097a42c039fa8d4905ec2c04fd2e72c24266ff79b9c87b850bef961daff7a6fb3a0df45dd7904409da0b383f85db1ef4c48f3122adc9b5abf27ccb60ef289fea54da04178aa4710a49814f40094eb21ad07261080bdba8c1451a2e45b4ed1361a0c13a0620d569ac2590827749739a545f47f237e8e2680bef2374327fad845c8296c93a0e95707a43973f82676ce9b35e3b7f2fdfba4e45a0b881d83cf82f36123ca930080f90211a0b037fdbdf256ff0ecca12de327d220ff28b3f3d312cc2e8b70e34586739e5c81a0fc894be17703ca157bf8f71587b42d0edca445b0720539201e68ee082af7eb6ba05cbda5d75281c8e1077b80785fa479301fd19ddbc6294e8c9a0624ed3fb96a76a0ba46ed4b15b5a6d555af8936388de319ba0235e9133df4afe88ec352d47df36fa0ff27f15fbe221fabec8e1ee1f0d1636de5fc1e6b125e2078032fc9aabdf03c05a0530e5949f4f4c3e7d2e289033332e823bf8ff1eced5fd0d58f6a1d7472944275a0cecb7c33f85f57fef3332095ff42dcaadbeb628119489fa8208a0a8c73a32436a028278f80ac8f391556534ea318023f52e771fe2a7743a745ab1bf58573a4133da04dfa02bb84ff96b50105e701b21822a529f3dbc9f0f6fe59fe219e8520221b27a0741c90073feccaa156ba8be321eb940f04614fba23157986e2e3b426277d53a7a0fdce8171737b54cc5ed4d53d23feef560f7035ec7dc34e33428e2caefd50d82ea0e852d38aeeb1862f232352c139ad640e857e7565e7a6d667b2196074dcac7a3ea05429a515bcf40e1cbc650bfca440e1a41d5fd0b9684764028a850ed66d69b17ca03447aa76626b769e552d4a98e336a79c083015665b5af3f4b5e6314f4592aecfa0bbd0785e0b664b80a3baf8130348df9e1e18fc5dcae41a9c9888df41486a9d08a0c09fcaf04068f935ef9bcbb4819c0cdc5cfc5ea68feedd4fe6cabc9c83e7561480f90211a05149ec605b794803218602aea6a0c8c8f2f4cb67435bf252225b2126ee219d48a0b9c3d332d3ed112cfddfdcf94ec567e7d900255ea7019035de992e0a11a10047a0a0150e15e0a12f891fd0191eb1777c709c5f994d9d3cbb0fb11dba6e6b779395a0e3804dd5ea32d1d04f20713c9feae3f47ab55f37b9ae300118a194764ed34c91a0f759bc4b416e2fa1ab4985eb97add20796e1d9be8a00cee66d60a7a32eebe465a071cd26dbffe9cd773fcd505876366427c6b85f9a17ee98ecdae0a6eaa776d1d3a0828996a14daca6697b777f99d05464f1f27caffb242892acae6d4b952a96ca90a0808f3bc9523251abeab1fc1321b9248aeaa495cf14a977f1e482153b6e9bfeada045b5a0071ea3f220397cf1d3971cd29aa50fc9636613f5e69937c7b31e565414a0086202c405274eef66d29e86ee76d933c3debb4cc4e182373b6980ee2c606b4ca0777206af7ac6d1cd3ebc0d5320553c7550ddd8eb1d6b00350aa9d4753c1fb136a0f149f52d5625645ee858246d3294ca169afaa6c146313b15c1c86b2cf4bccd43a0cd6293863bde44dd4a1df7c7919538617e8f107140562087ae2885c35758702ea00d1e699c3613983556a77316d656b67831c13c5e069fb18e2e96e0ed1a80a21da0424155278afe97e32747e3c25fd3340e68e6350a9ea7a06327368064c074d6a5a0c34a527eec08998e829b2df246b503c28551b6f65ca6a0aa3b4350cb17200f8c80f90151a0744d00ff280e769c2daf908c1e8a4b5e5ea9a653295deb0d07160d83eac7435aa010ef6734ed120f8f8ee079d2bf6db2a234d731e7d08c2f31e4738abc0d8443568080a01755a82d129503f82ff0a92265bb8d056a81456a346b788522aad848a99e000580a0ea8e41e2016c801b99b2bf7333bc5f27283388df703546c69d69057b21b085a8a0b0889dcbe633df5eb88b7a612bb25bd685c5d661dbd38b6819d0c197ab30e07680a084d71f99e326177e070f1618a05fb1bb9e3257cc9ea9c2e9cdc367943f41c4dda042d09c033a316c486dd6052b725fefc6d575ecb1a92389ed51db07236cde662180a080a3d9222507178bb567c5e1041070f041661bf60179e5595b044b10cb88fb8580a0334e35ff43871b958ff4b604161c6da0288f61a12316ed4f0a377d3fc06df37aa02081102b6f79d26a1ca5984a8abd89cf434be02ca2f2c4862494dc34dde73fe880e49f2087fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace83828a1c';
        let root = '0xda929e3057a947262f252e7e6d821d03af1652d1fcc923c7b3e8e43195ad9e72';
        let offset = 0x23

        it("Should return true while ok", async function () {
            expect(await eccu.checkNodeHash(proof, offset, root)).to.equal(true);
        });

        it("Should return false while not ok", async function () {
            expect(await eccu.checkNodeHash(proof, 0x20, root)).to.equal(false);
            expect(await eccu.checkNodeHash(proof, offset, empty32)).to.equal(false);
        });

    });

    describe("rlp decode", function () {

        it("rlpGetNextBytes", async function () {
            let rlpGetNextBytesTest = async function (raw, offset, res, _offset, willRevert) {
                if (willRevert==true) {
                    await expect(eccu.rlpGetNextBytes(raw,offset)).to.be.reverted;
                    return
                }
                let output = await eccu.rlpGetNextBytes(raw,offset);
                expect(output.res).to.equal(res);
                expect(output._offset).to.equal(_offset);
                expect(output._raw).to.equal(raw);
            }
            await rlpGetNextBytesTest('0x000087ffffffffffffff0000',0x22,'0xffffffffffffff',0x2a,false); // 7 bytes
            await rlpGetNextBytesTest('0x0000a0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000',0x22,'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',0x43,false); // 32 bytes
            await rlpGetNextBytesTest('0x0000b821ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000',0x22,'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',0x45,false); // 33 bytes
        });

        it("rlpGetNextBytes32", async function () {
            let rlpGetNextBytes32Test = async function (raw, offset, res, _offset, willRevert) {
                if (willRevert==true) {
                    await expect(eccu.rlpGetNextBytes32(raw,offset)).to.be.reverted;
                    return
                }
                let output = await eccu.rlpGetNextBytes32(raw,offset);
                expect(output.res).to.equal(res);
                expect(output._offset).to.equal(_offset);
                expect(output._raw).to.equal(raw);
            }
            await rlpGetNextBytes32Test('0x000087ffffffffffffff0000',0x22,'0xffffffffffffff00000000000000000000000000000000000000000000000000',0x2a,false); // 7 bytes
            await rlpGetNextBytes32Test('0x0000a0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000',0x22,'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',0x43,false); // 32 bytes
            await rlpGetNextBytes32Test('0x0000a1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000',0x22,0,0,true); // 33 bytes , too long
        });

        it("rlpGetNextUint64", async function () {
            let rlpGetNextUint64Test = async function (raw, offset, res, _offset, willRevert) {
                if (willRevert==true) {
                    await expect(eccu.rlpGetNextUint64(raw,offset)).to.be.reverted;
                    return
                }
                let output = await eccu.rlpGetNextUint64(raw,offset);
                expect(output.res).to.equal(res);
                expect(output._offset).to.equal(_offset);
                expect(output._raw).to.equal(raw);
            }
            await rlpGetNextUint64Test('0x00008600ffffffffff0000',0x22,0xffffffffff,0x29,false); // 6 bytes
            await rlpGetNextUint64Test('0x000088000000ffffffffff0000',0x22,0xffffffffff,0x2b,false); // 8 bytes
            await rlpGetNextUint64Test('0x000089ffffffffffffffffff0000',0x22,0,0,true); // 9 bytes , too long
        });

        it("rlpGetNextUint256", async function () {
            let rlpGetNextUint256Test = async function (raw, offset, res, _offset, willRevert) {
                if (willRevert==true) {
                    await expect(eccu.rlpGetNextUint256(raw,offset)).to.be.reverted;
                    return
                }
                let output = await eccu.rlpGetNextUint256(raw,offset);
                expect(output.res).to.equal(res);
                expect(output._offset).to.equal(_offset);
                expect(output._raw).to.equal(raw);
            }
            await rlpGetNextUint256Test('0x00008700000000000fff0000',0x22,0x0fff,0x2a,false); // 7 bytes
            await rlpGetNextUint256Test('0x0000a000000000000000000000000000000000000000000000000000000000ffffffff0000',0x22,0xffffffff,0x43,false); // 32 bytes
            await rlpGetNextUint256Test('0x0000a1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000',0x22,0,0,true); // 33 bytes , too long
        });

        it("rlpSplit", async function () {
            let rlpSplitTest = async function (raw, offset, res, offset_) {
                let output = await eccu.rlpSplit(raw,offset);
                expect(output.res).to.equal(res);
                expect(output.offset_).to.equal(offset_);
            }
            let raw = '0x77'+'82ffff'+'b803ffffff'+'c480808080'+'f8058080808080';
            let offset1 = 0x20;
            let res1 = '0x77';
            let offset2 = 0x21;
            let res2 = '0xffff';
            let offset3 = 0x24;
            let res3 = '0xffffff';
            let offset4 = 0x29;
            let res4 = '0x80808080';
            let offset5 = 0x2e;
            let res5 = '0x8080808080';
            let offset_ = 0x35;
            await rlpSplitTest(raw, offset1, res1, offset2);
            await rlpSplitTest(raw, offset2, res2, offset3);
            await rlpSplitTest(raw, offset3, res3, offset4);
            await rlpSplitTest(raw, offset4, res4, offset5);
            await rlpSplitTest(raw, offset5, res5, offset_);
        });

    

        it("rlpReadKind", async function () {
            let rlpReadKindTest = async function (raw, offset, kind, size, offset_) {
                let output = await eccu.rlpReadKind(raw, offset);
                expect(output.kind).to.equal(kind);
                expect(output.size).to.equal(size);
                expect(Number(output.offset_)+size).to.equal(offset_);
            }
            let raw = '0x77'+'82ffff'+'b803ffffff'+'c480808080'+'f8058080808080';
            let offset1 = 0x20;
            let size1 = 1;
            let kind1 = 1;
            let offset2 = 0x21;
            let size2 = 2;
            let kind2 = 2;
            let offset3 = 0x24;
            let size3 = 3;
            let kind3 = 3;
            let offset4 = 0x29;
            let size4 = 4;
            let kind4 = 4;
            let offset5 = 0x2e;
            let size5 = 5;
            let kind5 = 5;
            let offset_ = 0x35;
            await rlpReadKindTest(raw, offset1, kind1, size1, offset2);
            await rlpReadKindTest(raw, offset2, kind2, size2, offset3);
            await rlpReadKindTest(raw, offset3, kind3, size3, offset4);
            await rlpReadKindTest(raw, offset4, kind4, size4, offset5);
            await rlpReadKindTest(raw, offset5, kind5, size5, offset_);
        });

    });

    describe("key conversion", function () {

        let keyHex1 = '0x0102030410';
        let keyCompact1 = '0x201234';
        let keyBytes1 = '0x1234';

        let keyHex2 = '0x01020304';
        let keyCompact2 = '0x001234';

        let keyHex3 = '0x010203040510';
        let keyCompact3 = '0x312345';

        let keyHex4 = '0x0102030405';
        let keyCompact4 = '0x112345';

        it("bytesToHex", async function () {
            expect(await eccu.bytesToHex(keyBytes1)).to.equal(keyHex1);
        });

        it("compactToHex", async function () {
            expect(await eccu.compactToHex(keyCompact1)).to.equal(keyHex1);
            expect(await eccu.compactToHex(keyCompact2)).to.equal(keyHex2);
            expect(await eccu.compactToHex(keyCompact3)).to.equal(keyHex3);
            expect(await eccu.compactToHex(keyCompact4)).to.equal(keyHex4);
        });

        it("hexToCompact", async function () {
            expect(await eccu.hexToCompact(keyHex1)).to.equal(keyCompact1);
            expect(await eccu.hexToCompact(keyHex2)).to.equal(keyCompact2);
            expect(await eccu.hexToCompact(keyHex3)).to.equal(keyCompact3);
            expect(await eccu.hexToCompact(keyHex4)).to.equal(keyCompact4);
        });

    });

    describe("takeOneByte", function () {

        it("Should take one byte", async function () {
            let raw = '0x0a0b0c';
            let slice = '0x0b0c';
            let b1 = 0x0a;
            let res = await eccu.takeOneByte(raw);
            expect(res.buf).to.equal(slice);
            expect(res.i).to.equal(b1);
        });

        it("Should fail if input is empty", async function () {
            await expect(eccu.takeOneByte('0x')).to.be.reverted;
        });

    });

    describe("compareKey", function () {

        let key = '0x0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000111122223333'; // 40 bytes

        let eleValid1 = '0x000011';  // 6 bytes
        let slice1 = '0x1122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000111122223333';
        let eleValid2 = '0x0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff000011'; // 35 bytes
        let slice2 = '0x1122223333';
        let eleValid3 = '0x0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000111122223333'; // 40 bytes
        let slice3 = '0x';

        let eleInvalid1 = '0x000022';  // 6 bytes
        let eleInvalid2 = '0x0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff000022'; // 35 bytes
        let eleInvalid3 = '0x0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff00001111222233334444'; // 42 bytes2

        it("Should return correct slice & true while ok", async function () {
            let res1 = await eccu.compareKey(key,eleValid1);
            expect(res1.isIn).to.equal(true);
            expect(res1.keySlice).to.equal(slice1);

            let res2 = await eccu.compareKey(key,eleValid2);
            expect(res2.isIn).to.equal(true);
            expect(res2.keySlice).to.equal(slice2);

            let res3 = await eccu.compareKey(key,eleValid3);
            expect(res3.isIn).to.equal(true);
            expect(res3.keySlice).to.equal(slice3);
        });

        it("Should return key & false if key element unmatch", async function () {
            let res1 = await eccu.compareKey(key,eleInvalid1);
            expect(res1.isIn).to.equal(false);
            expect(res1.keySlice).to.equal(key);
            
            let res2 = await eccu.compareKey(key,eleInvalid2);
            expect(res2.isIn).to.equal(false);
            expect(res2.keySlice).to.equal(key);

            let res3 = await eccu.compareKey(key,eleInvalid3);
            expect(res3.isIn).to.equal(false);
            expect(res3.keySlice).to.equal(key);
        });

    });

});


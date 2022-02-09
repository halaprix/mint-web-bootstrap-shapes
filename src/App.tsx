import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import React, { FC, ReactNode, useMemo } from 'react';
import Home from './Home';

import 'bootstrap/dist/css/bootstrap.min.css';
require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
    try {
      const candyMachineId = new anchor.web3.PublicKey(
        process.env.REACT_APP_CANDY_MACHINE_ID!,
      );
  
      return candyMachineId;
    } catch (e) {
      console.log('Failed to construct CandyMachineId', e);
      return undefined;
    }
  };
  
  const candyMachineId = getCandyMachineId();
  const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
  const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);
  const connection = new anchor.web3.Connection(rpcHost
    ? rpcHost
    : anchor.web3.clusterApiUrl('devnet'));
const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider><Home
              candyMachineId={candyMachineId}
              connection={connection}
              startDate={startDateSeed}
              txTimeout={30000}
              rpcHost={rpcHost}
            /></WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = (props:any) => {
    return (
        <div className="App">
               <Home
              candyMachineId={candyMachineId}
              connection={props.endpoint}
              startDate={startDateSeed}
              txTimeout={30000}
              rpcHost={rpcHost}
            />
        </div>
    );
};
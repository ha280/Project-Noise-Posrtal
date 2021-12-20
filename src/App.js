import './App.css';

import * as web3 from "@solana/web3.js";

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';

import BurnPortal from './pages/burnPortal';
import NewHome from './pages/newHome';
import TopNav from './components/TopNav/TopNav';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

//FOR WALLET CONNECTION

require('@solana/wallet-adapter-react-ui/styles.css');

function App() {

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // const rpcHost = "https://explorer-api.devnet.solana.com";
  const rpcHost = "https://bitter-summer-wave.solana-mainnet.quiknode.pro/966785bad8457941c4f993c3dfb023d35284efb2/"; //TODO: need to update it with noise quicknode
  const connection = new web3.Connection(rpcHost, "recent");

  console.log("connection", connection);
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(() => [
    getPhantomWallet(),
    getSolletWallet({ network }),
    getSolflareWallet(),
  ], [network]);

  return (
    <Router>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider >
            <TopNav />
            <Switch>
              <Route exact path='/' render={() => <NewHome connection={connection} />} />
              <Route exact path='/burnPortal' render={() => <BurnPortal connection={connection} />} />
            </Switch>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>

  );
}

export default App;

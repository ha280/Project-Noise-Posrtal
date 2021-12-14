import {useMemo} from 'react';
import './App.css';
import TopNav from './components/TopNav/TopNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//FOR WALLET CONNECTION
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import * as web3 from "@solana/web3.js";

import NewHome from './pages/newHome';
import BurnPortal from './pages/burnPortal';

require('@solana/wallet-adapter-react-ui/styles.css');

function App() {

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // const rpcHost = "https://explorer-api.devnet.solana.com";
  const rpcHost = "https://dry-holy-paper.solana-mainnet.quiknode.pro/5d51cc47b9102310825d0b49b644592d2d2fb877/"; //TODO: need to update it with noise quicknode
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
            {/* <Route exact path='/' component={newHome} /> */}
            <Route exact path='/' render={() => <NewHome connection={connection} />}/>
            {/* <Route exact path='/burnPortal' component={BurnPortal} connection={connection} /> */}
            <Route exact path='/burnPortal' render={() => <BurnPortal connection={connection} />} />
          </Switch>
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </Router>

  );
}

export default App;
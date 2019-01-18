import * as React from 'react';
import { match } from 'react-router-dom'
import { MessageFeed } from '../components'

interface ChannelMatch {
  channelName: string;
}

interface ChannelProps {
  match: match<ChannelMatch>;
}
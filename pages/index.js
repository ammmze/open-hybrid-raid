import Head from 'next/head'
import { Disk } from '../components/disks/Disk'
import { IconsBySvgRepo } from '../components/IconsBySvgRepo'
import { Footer } from '../components/Footer'
import { GlobalStyles } from '../components/GlobalStyles'
import { Fragment, useEffect } from 'react'
import { useRaidCalculator } from '../components/disks/hooks/useRaidCalculator'
import { VolumeGroup } from '../components/disks/VolumeGroup'
import { Partition } from '../components/disks/Partition'
import { RaidArray } from '../components/disks/RaidArray'
import { useRouter } from 'next/router';

const sizes = [500, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];

export default function Home() {
  const router = useRouter();
  const { arrays, disks, addDisk, removeDisk } = useRaidCalculator({
    disks: (router.query.disks || '').split('~').map(size => Number(size) * 1000).filter(size => size > 0)
  });

  const diskList = disks.map(size => size / 1000).join('~');
  useEffect(() => {
    if (!router.query.disks && diskList.length < 1) return;
    console.log('replace url', diskList);
    router.replace({
      pathname: window.location.pathname,
      query: { ...router.query, disks: diskList }
    }, undefined, { shallow: true });
  }, [diskList]);
  
  return (
    <Fragment>
      <GlobalStyles />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{padding: '2em'}}>
        <div style={{textAlign: 'center'}}>
          <h3>Select disks to add to array</h3>
          {sizes.sort((a, b) => b - a).map(size => <Disk as="button" key={size} size={size} onClick={() => addDisk(size)} />)}
        </div>

        <hr />

        <h3>Breakdown</h3>
        <p>
          Each RAID array that should be created is outlined in red. Each column is a single disk.
        </p>
        <p>
          The general process is to iterate through creating RAID 5 arrays with the largest partition size that
          fits across all remaining disks and there 3+ disks that can support that partitition size. Eventually you
          may then only have 2 disks that can create the same size partition, in which case a RAID 1 array created and
          then leaving you with a single disk with an un-used partition.
        </p>
        <VolumeGroup arrays={arrays}>
          {disks.map((size, index) => ({ size, index })).sort((a, b) => b.size - a.size).map(({ size, index }) => <Disk as="button" key={`${index}-${size}`} size={size} onClick={() => removeDisk(index)} style={{ width: `calc(${100 / (disks.length || 100)}% - 0.3em * 2)` }} />)}
          {arrays.map((array, i) => (
            <RaidArray key={i} type={array.type}>
              {Array.from(Array(array.partitionCount)).map((_, part) => (
                <Partition key={`${i}.${part}`} size={array.partitionSize} type={array.type} style={{ width: `calc(${100 / (disks.length || 100)}% - 0.3em * 2)` }} />
              ))}
            </RaidArray>
          ))}
        </VolumeGroup>
      </main>

      <Footer>
        <IconsBySvgRepo />
      </Footer>
    </Fragment>
  )
}

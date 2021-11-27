import Head from 'next/head'
import { Disk } from '../components/disks/Disk'
import { IconsBySvgRepo } from '../components/IconsBySvgRepo'
import { Footer } from '../components/Footer'
import { GlobalStyles } from '../components/GlobalStyles'
import { Fragment } from 'react'
import { useRaidCalculator } from '../components/disks/hooks/useRaidCalculator'
import { VolumeGroup } from '../components/disks/VolumeGroup'
import { Partition } from '../components/disks/Partition'
import { RaidArray } from '../components/disks/RaidArray'

const sizes = [500, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];

export default function Home() {
  const { arrays, disks, addDisk, removeDisk } = useRaidCalculator();
  console.log(arrays);
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
          {sizes.sort((a, b) => b - a).map(size => <Disk key={size} size={size} onClick={() => addDisk(size)} />)}
        </div>

        <div style={{textAlign: 'center'}}>
          <h3>Disks in your array</h3>
          {disks.map((disk, i) => <Disk key={`${i}-${disk}`} size={disk} onClick={() => removeDisk(i)} />)}
        </div>

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
          {arrays.map((array, i) => (
            <RaidArray key={i} type={array.type}>
              {Array.from(Array(array.partitionCount)).map(part => (
                <Partition key={`${i}.${part}`} size={array.partitionSize} type={array.type} />
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

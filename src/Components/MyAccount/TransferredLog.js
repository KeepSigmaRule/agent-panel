import React from 'react'

const TransferredLog = () => {
  return (
    <>
        <h2>Transferred Log</h2>
        <table class="table01">
            <tbody>
            <tr>
                <th width="15%" class="align-L">Date/Time</th>
                <th width="15%">Before Settlement</th>
                <th width="15%">Settled Amount</th>
                <th width="15%">After Settlement</th>
                <th width="" class="align-L">Remarks</th>
                <th width="20%" class="align-L">From/To</th>
            </tr>

            </tbody>
            <tbody id="content"><tr id="noDataTempTr">
            <td class="no-data" colspan="6">
              Sorry, there is no data to display.
            </td>
            </tr>
            </tbody>
        </table>
    </>
  )
}

export default TransferredLog
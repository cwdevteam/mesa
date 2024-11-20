import { PDFHeadingProps } from '@/types/pdfHeadingsProps'

const getRightsAndDuties = (adminName: string) => {
  const rightsAndDuties = {
    heading: 'Rights and duties of the parties.',
    paragraphs: [
      {
        text: `The parties agree and accept the mutual assignment of copyright ownership in the proportions set forth in clause 2 of this agreement for the Master Recording. Consequently, each of the parties receives for itself, in its patrimony, in perpetuity, and for the whole territory, all the rights, interests, and prerogatives granted by copyright ownership of the mentioned work, according to the law and to the present agreement.`,
      },
      {
        text: `The parties agree that the Master Recording is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Master Recording in collaboration is divided between the Contracting Parties in the percentages established in clause 2 of the present contract.`,
      },
      {
        text: `By means of the present contract, the parties recognize, accept, and declare that they designate <span class="underline">${adminName}</span> as the representative in charge of making the decisions related to the commercial exploitation of the Master Recording. The designated person will make their best effort to achieve the greatest commercial benefit of the works which includes but is not limited to: offering licenses to the market, working with publishing companies, music distributors, record labels or synchronizations. The representative is NOT authorized to sell or dispose of the copyright ownership of the Master Recording and the recording, they can only offer licenses of use. The sale of copyrights is an exclusive faculty of each owner.`,
      },
    ],
  }
  return rightsAndDuties
}
const getRightsAndDutiesVote = (votePercentage: number) => {
  const rightsAndDutiesVote = {
    heading: 'Rights and duties of the parties.',
    paragraphs: [
      {
        text: `The parties agree and accept the mutual assignment of copyright ownership in the proportions set forth in clause 2 of this agreement for the Master Recording. Consequently, each of the parties receives for itself, in its patrimony, in perpetuity, and for the whole territory, all the rights, interests, and prerogatives granted by copyright ownership of the mentioned work, according to the law and to the present agreement.`,
      },
      {
        text: `The parties agree that the Master Recording is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Master Recording in collaboration is divided between the Contracting Parties in the percentages established in clause 2 of the present contract.`,
      },
      {
        text: `None of the parties may perform legally relevant acts on the Master Recording without the written authorization of the <span class="underline">${votePercentage}%</span> of the ownership, such as but not limited to the following: `,
        children: [
          {
            text: `Exploiting the musical performance of the other contributions in a manner different from that set in the Master copy.`,
          },
          {
            text: `Edit, alter, or modify the performance of the parts, except for formatting purposes.`,
          },
          {
            text: `Commercially exploiting the Master Recording in a manner that directly or indirectly suggests approval or endorsement of a product or service other than the sound recording itself.`,
          },
          {
            text: `Grant exclusive or non-exclusive licenses on the Master Recording to third parties.`,
          },
        ],
      },
    ],
  }
  return rightsAndDutiesVote
}

const distributionsAndMonetization = {
  heading: 'Distribution and monetization of works',
  paragraphs: [
    {
      text: `Parties agree and accept that they shall seek and select a competitive distributor or aggregator, which shall be responsible for making the works available to the public and shall collect and pay the respective royalties to each of the Master Recording copyright owners according to the proportions indicated in clause 2 of this contract.`,
    },
    {
      text: `The parties agree that they will seek a distributor who will professionally and responsibly collect royalties for commercial exploitation of the Master Recording in the respective known and unknown uses. Such a distributor will pay each copyright owner in the proportions agreed upon in clause 2 of this contract. In the event that the works have not been distributed with an aggregator that offers the service of direct payments to each of the copyright owners, the administrator or the party that receives any sum of money for royalties belonging to another of the parties, must pay them within 14 days in the respective bank account.`,
    },
    {
      text: `In the event that the administrator or any of the parties receives money from any third party attributable to the commercial exploitation of the Master Recording, such as synchronization licenses, or of any other type, the administrator or party receiving the money shall pay to the other parties the royalties corresponding to the pro rata of its participation in the copyright ownership, no later than fourteen days after receiving the money.`,
    },
  ],
}

const credits = {
  heading: 'Credits',
  paragraphs: [
    {
      text: `The credits of each co-owner or collaborator shall be presented according to their corresponding role in the Master Recording, whether as recording musician, producer, etc., and mentioning their legal or artistic name, as decided.`,
    },
  ],
}

const licenseForArtist = {
  heading: `License for artists`,
  paragraphs: [
    {
      text: `Each of the co owners is hereby granted a license to use the names of artists, approved portraits, and biographical material approved by each of the parties for the exclusive purpose of promoting and commercially exploiting the Master Recording. Each party shall have the right to approve any biographical or identification materials selected or commissioned by the other, provided that such consent to the Biographical Materials is not unreasonably withheld or delayed. In the event of unreasonable delay, approval shall be deemed granted within five (5) business days of the date such Biographical Materials are received by the party required to grant approval.`,
    },
  ],
}

const accounting = {
  heading: 'Acccounting',
  paragraphs: [
    {
      text: `Each party has the right to engage a certified public accountant to audit the books and records of the administrator or other parties solely to verify the receipt and payment of monies derived from the Master Recording. This audit right may be exercised to verify the accuracy of such statements twice a year, at the sole expense of the party concerned and upon at least thirty (30) days prior written notice. Any objection relating to any financial statement must be filed no later than three years from the date of inspection.`,
    },
  ],
}

const fullCapacity = {
  heading: `Full capacity and indemnity against third parties.`,
  paragraphs: [
    {
      text: `The parties acknowledge and declare that each of them has the capacity to contract and does so freely, without any restriction or prohibition whatsoever, including restrictions derived from record, publishing or representation agreements with any third party.`,
    },
    {
      text: `The parties also declare that all their contributions to the Master Recording are original and do not infringe on the economic or moral rights or interests of third parties.`,
    },
    {
      text: `The parties agree that in the event of any claim by third parties for copyright or otherwise, the responsible party shall hold harmless the non-responsible parties from any judicial or extrajudicial claim arising out of its contribution to the Master Recording, or out of its participation in or performance of this contract. `,
    },
  ],
}

const fullAutonomy = {
  heading: `Full autonomy and no employment relationship`,
  paragraphs: [
    {
      text: `The parties understand, acknowledge, and declare that no employment relationship exists between them. They act as independent artists with full administrative and artistic autonomy. Nothing in this contract shall be construed as an employment, partnership or business relationship other than collaboration between artists for the production of a joint artistic work.`,
    },
  ],
}

const rightsOfFirstRefusal = {
  heading: `Rights of first refusal`,
  paragraphs: [
    {
      text: `Parties agree that in the event they wish to sell or otherwise dispose of or transfer their ownership in the copyrights of the Master Recording, they shall grant to the other parties a right of first refusal or first option to purchase to the other parties to the contract, first on a pro rata basis, and secondly on an individual basis. In the event that the purchase option is not exercised by the other parties, the seller may freely offer its share to the market.`,
    },
  ],
}

const notices = {
  heading: 'Notices',
  paragraphs: [
    {
      text: `The parties will be notified of any decision, controversy, negotiation or relevant matter related to this contract, via email or certified physical mail at the physical and electronic addresses that appear at the bottom of their signature. `,
    },
  ],
}

const disputeSettlement = {
  heading: 'Dispute settlement',
  paragraphs: [
    {
      text: `Any controversy will be dealt with through dialogue between the parties. Failing this, they will seek to exhaust an alternative dispute resolution mechanism, and failing this, they will submit it to the competent judges under the laws of the United States of America.`,
    },
    {
      text: `If any provision of this Agreement is invalid, void or unenforceable, the remainder of the Agreement shall remain in full force and effect. This Agreement may not be modified in any way except by an instrument signed by the parties. This Agreement may be signed in duplicate (and/or facsimile and/or PDF), each of which shall be deemed an original, but all of which together shall constitute the Agreement. 
`,
    },
  ],
}

export const getMasterPDFHeadings = ({
  type,
  adminName,
  votePercentage,
}: PDFHeadingProps) => {
  return [
    type.toLowerCase() === 'vote'
      ? getRightsAndDutiesVote(votePercentage)
      : getRightsAndDuties(adminName),
    distributionsAndMonetization,
    credits,
    licenseForArtist,
    accounting,
    fullCapacity,
    fullAutonomy,
    rightsOfFirstRefusal,
    notices,
    disputeSettlement,
  ]
}

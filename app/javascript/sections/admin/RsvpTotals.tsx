import { string } from "prop-types";
import React from "react";
import { Segment, Statistic, SemanticCOLORS } from "semantic-ui-react";

export default function RsvpTotals({ totals }) {
  return (
    <div>
      <Segment vertical>
        <h3>Going</h3>
        <RsvpStatistic value={totals.going} label={"Going"} color="green" />
        <RsvpStatistic
          value={totals.notGoing}
          label={"Not going"}
          color="red"
        />
        <RsvpStatistic
          value={totals.plusOneNotGoing}
          label={"Plus One Not going"}
          color="orange"
        />
        <RsvpStatistic
          value={
            totals.totalRsvpsCount -
            (totals.going + totals.notGoing + totals.plusOneNotGoing)
          }
          label={"Pending"}
          color="olive"
        />
        <RsvpStatistic value={totals.totalRsvpsCount} label={"Total invited"} />
      </Segment>
      <Segment vertical>
        <h3>Ages</h3>
        <RsvpStatistic
          value={totals.adultCount}
          label={"Adults"}
          color="grey"
        />
        <RsvpStatistic value={totals.childCount} label={"Child"} color="teal" />
      </Segment>
      <Segment vertical>
        <h3>Meal choices</h3>
        <RsvpStatistic value={totals.beefMeal} label={"Beef"} />
        <RsvpStatistic value={totals.salmonMeal} label={"Salmon"} />
        <RsvpStatistic value={totals.vegMeal} label={"Vegetarian"} />
        <RsvpStatistic value={totals.kidsMeal} label={"Chicken and Fries"} />
      </Segment>
      <Segment vertical>
        <h3>Groups</h3>
        <RsvpStatistic
          value={totals.weddingParty}
          label={"Wedding party"}
          color="pink"
        />
        <RsvpStatistic
          value={totals.jessFamily}
          label={"Jess's Family"}
          color="purple"
        />
        <RsvpStatistic
          value={totals.jessFriends}
          label={"Jess's Friends"}
          color="violet"
        />
        <RsvpStatistic
          value={totals.markFamily}
          label={"Mark's Family"}
          color="orange"
        />
        <RsvpStatistic
          value={totals.markFriends}
          label={"Mark's Friends"}
          color="yellow"
        />
      </Segment>
    </div>
  );
}

interface StatisticProps {
  value: string | number;
  label: string;
  color?: SemanticCOLORS;
}

function RsvpStatistic({ value, label, color = "black" }: StatisticProps) {
  return (
    <Statistic size={"small"} color={color}>
      <Statistic.Value>{value}</Statistic.Value>
      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  );
}

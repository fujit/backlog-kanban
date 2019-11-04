<template>
  <div>
    <section class="card">
      <div class="card-text">
        <p class="text-small">{{ issue.issueKey }}</p>
        <div class="count-tag">
          <b-tag :type="countTagColor">{{ notificationCount }}</b-tag>
        </div>
        <p class="text-large card-summary">{{ issue.summary }}</p>

        <div class="card-text--sub">
          <p class="text-small">
            担当者:
            <template v-if="issue.assignee">{{ issue.assignee.name }}</template>
          </p>

          <p class="text-small">
            種別:
            {{ issue.issueType.name }}
          </p>

          <p class="text-small">
            マイルストーン:
            <template v-if="issue.milestone.length > 0">
              {{ issue.milestone[0].name }}
            </template>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import axios from 'axios';
import { issueInterface, notification } from '~/store/issue/type';

@Component
class Card extends Vue {
  @Prop({ type: Object, required: true })
  issue: issueInterface;
  notifications: notification[] = [];
  notificationCount: number = 0;

  get countTagColor(): string {
    return this.notificationCount > 0 ? 'is-danger' : '';
  }

  mounted() {
    this.fetchNotifications();
  }

  @Watch('notifications')
  onNotificationsChanged(newNotifications: notification[]) {
    this.notificationCount = newNotifications.filter(
      (notification) =>
        notification.projectId === this.issue.projectId &&
        notification.issueId === this.issue.id
    ).length;
  }

  fetchNotifications() {
    axios
      .get(`${process.env.BACKLOG_BASE_URL}/api/v2/notifications?`, {
        params: {
          apiKey: process.env.BACKLOG_API_KEY,
          count: 100,
        },
      })
      .then((res) => {
        const notifications = res.data
          .filter((data: any) => !data.alreadyRead)
          .map((element: any) => ({
            projectId: element.project.id,
            issueId: element.issue.id,
          }));
        this.notifications = notifications;
      });
  }
}

export default Card;
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 100%;
  height: 180px;

  &-text {
    padding: 10px;

    &--sub {
      position: absolute;
      bottom: 5%;
    }
  }

  &-summary {
    margin-top: 10px;
  }
}

.count-tag {
  position: absolute;
  top: 2%;
  right: 2%;
}

.text-small {
  font-size: small;
}

.text-large {
  font-size: large;
}
</style>

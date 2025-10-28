import { useState } from 'react';
import { API } from 'aws-amplify';

interface NotificationTemplate {
  id: string;
  name: string;
  channel: 'push' | 'sms' | 'email';
  body: string;
}

const defaultTemplate: NotificationTemplate = {
  id: 'promo',
  name: 'Weekend Promo',
  channel: 'push',
  body: 'Buy one get one free!'
};

export function NotificationsCenter() {
  const [template, setTemplate] = useState(defaultTemplate);

  async function sendPreview() {
    await API.post('NotificationsService', '/preview', {
      body: { templateId: template.id }
    });
  }

  return (
    <div>
      <h2>Notifications</h2>
      <p>Trigger push, SMS, and email campaigns via Amazon Pinpoint.</p>
      <label>
        Template Body
        <textarea
          value={template.body}
          onChange={(event) => setTemplate({ ...template, body: event.target.value })}
        />
      </label>
      <button type="button" onClick={sendPreview}>
        Send Test Notification
      </button>
    </div>
  );
}

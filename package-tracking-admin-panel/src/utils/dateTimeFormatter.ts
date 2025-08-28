export default function formatReadableDate(isoString: string): string {
    const date = new Date(isoString);
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',    // Must be "long" | "short" | "narrow"
      year: 'numeric',
      month: 'long',      // Must be "numeric" | "2-digit" | "long" | "short" | "narrow"
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    };
  
    return date.toLocaleString('en-US', options) + ' (UTC time)';
  }
  
export default function AdminSettings() {
  return (
    <div className="max-w-lg space-y-6">
      <h2 className="font-serif text-2xl text-foreground">Settings</h2>
      <div className="bg-card border border-border p-6" style={{ borderRadius: "12px" }}>
        <h3 className="font-sans text-sm font-medium text-foreground mb-2">Admin Account</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your admin account is managed through Lovable Cloud authentication. Contact support to update credentials.
        </p>
        <h3 className="font-sans text-sm font-medium text-foreground mb-2 mt-6">Site Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Use the Photo Manager to update site images. Property listings can be managed from the Properties page.
        </p>
      </div>
    </div>
  );
}

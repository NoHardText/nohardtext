export function BillingPage() {
  return (
    <>
      <section title="Billing overview">
        <h1>Billing</h1>

        <div
          data-testid="billing-summary"
          data-plan-id="pro"
          data-status="active"
        >
          Current Plan
        </div>

        <button aria-label="Upgrade subscription">
          Upgrade
        </button>
      </section>
    </>
  );
}

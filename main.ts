import { program } from "commander";

interface Instance {
  oid: string;
  hostname: string;
}

interface License {
  instances: Instance[];
}

async function unlinkDevice(code: string, oid: string): Promise<boolean> {
  try {
    const response = await fetch("https://licenses.maketheweb.io/api/unlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, oid }),
    });

    return response.ok;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error unlinking device: ${error.message}`);
    } else {
      console.error(`Error unlinking device: ${error}`);
    }
    return false;
  }
}

program
  .requiredOption("-c, --code <code>", "The license code to unlink")
  .parse(process.argv);

const args = program.opts();
const code = args.code;

if (!code) {
  console.error("Please provide a license code");
  process.exit(1);
}
try {
  const response = await fetch(
    `https://licenses.maketheweb.io/api/licenses?code=${code}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch license info: ${response.statusText}`);
  }

  const licenses = (await response.json()) as License[];

  if (licenses.length === 0) {
    console.error("No license found with the provided code");
    process.exit(1);
  }

  const instances = licenses[0].instances;

  if (instances.length === 0) {
    console.log("No devices linked to this license");
    process.exit(0);
  }

  console.log(`Found ${instances.length} linked device(s)`);

  for (const instance of instances) {
    console.log(`Unlinking device: ${instance.hostname} (${instance.oid})`);
    const success = await unlinkDevice(code, instance.oid);

    if (success) {
      console.log(`Successfully unlinked device: ${instance.hostname}`);
    } else {
      console.error(`Failed to unlink device: ${instance.hostname}`);
    }
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error(`Error: ${error}`);
  }
  process.exit(1);
}

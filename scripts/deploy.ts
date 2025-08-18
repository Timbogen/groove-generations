import { execSync } from "child_process";
import fs from "fs";

(async () => {
    try {
        execSync("git checkout --orphan gh-pages", { stdio: "inherit" });
        console.log("Building...");
        execSync("npm run build", { stdio: "inherit" });

        // Add CNAME file
        const folderName = "out";
        fs.writeFileSync(`${folderName}/.nojekyll`, "");
        fs.writeFileSync(`${folderName}/CNAME`, "groovegenerations.de");

        execSync(`git --work-tree ${folderName} add --all`, { stdio: "inherit" });
        execSync(`git --work-tree ${folderName} commit -m gh-pages`, { stdio: "inherit" });

        console.log("Pushing to gh-pages...");
        execSync(`git push origin HEAD:gh-pages --force`, { stdio: "inherit" });
        execSync(`rm -r ${folderName}`, { stdio: "inherit" });
        execSync(`git checkout -f main`, { stdio: "inherit" });
        execSync(`git branch -D gh-pages`, { stdio: "inherit" });

        console.log("Successfully deployed");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
